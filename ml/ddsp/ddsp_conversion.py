# Ignore a bunch of deprecation warnings
import warnings
warnings.filterwarnings("ignore")

import copy
import os
import time

import crepe
import ddsp
import ddsp.training
# from ddsp.colab.colab_utils import (
#     auto_tune, get_tuning_factor, download,
#     play, record, specplot, upload,
#     DEFAULT_SAMPLE_RATE)
from ddsp.training.postprocessing import (
    detect_notes, fit_quantile_transform
)
import gin
# from google.colab import files
import librosa
import matplotlib.pyplot as plt
import numpy as np
import pickle
import tensorflow.compat.v2 as tf
import tensorflow_datasets as tfds
import soundfile as sf 

# Helper Functions
DEFAULT_SAMPLE_RATE  = 16000
sample_rate = DEFAULT_SAMPLE_RATE


class AudioProcessor:
    def __init__(self, model_name="violin", pretrained_dir="./pretrained"):
        """
        Initialize the AudioProcessor with model details.
        :param model_name: The name of the instrument model to use.
        :param pretrained_dir: Path to the directory containing pretrained models.
        """
        self.model_name = model_name.lower()
        self.pretrained_dir = pretrained_dir
        self.model_dir = os.path.join(pretrained_dir, f"solo_{self.model_name}_ckpt")
        self.gin_file = os.path.join(self.model_dir, "operative_config-0.gin")
        self.dataset_stats_file = os.path.join(self.model_dir, "dataset_statistics.pkl")
        self.model = None

    def load_model(self):
        """Loads the model and configuration."""
        if not os.path.exists(self.gin_file):
            raise FileNotFoundError(f"Configuration file not found in {self.model_dir}")

        print(f"Loading dataset statistics from {self.dataset_stats_file}")
        dataset_stats = None
        if os.path.exists(self.dataset_stats_file):
            with open(self.dataset_stats_file, 'rb') as f:
                dataset_stats = pickle.load(f)

        with gin.unlock_config():
            gin.parse_config_file(self.gin_file, skip_unknown=True)

        ckpt_files = [f for f in os.listdir(self.model_dir) if 'ckpt' in f]
        if not ckpt_files:
            raise FileNotFoundError(f"No checkpoint files found in {self.model_dir}")

        ckpt_name = ckpt_files[0].split('.')[0]
        ckpt = os.path.join(self.model_dir, ckpt_name)

        self.model = ddsp.training.models.Autoencoder()
        self.model.restore(ckpt)
        print("Model restored successfully.")

    def preprocess_audio(self, audio_path, sample_rate=16000):
        """Loads and preprocesses audio for feature extraction."""
        if not os.path.exists(audio_path):
            raise FileNotFoundError(f"Audio file {audio_path} not found.")

        audio, sr = librosa.load(audio_path, sr=sample_rate)
        print(f"Audio file {audio_path} loaded successfully.")

        if len(audio.shape) == 1:
            audio = audio[np.newaxis, :]

        ddsp.spectral_ops.reset_crepe()

        start_time = time.time()
        audio_features = ddsp.training.metrics.compute_audio_features(audio)
        audio_features['loudness_db'] = audio_features['loudness_db'].astype(np.float32)
        print('Audio feature extraction took %.1f seconds' % (time.time() - start_time))

        return audio, audio_features

    def adjust_model_parameters(self, audio_features):
        """Adjusts model parameters dynamically based on audio features."""
        time_steps_train = gin.query_parameter('F0LoudnessPreprocessor.time_steps')
        n_samples_train = gin.query_parameter('Harmonic.n_samples')
        hop_size = int(n_samples_train / time_steps_train)

        time_steps = int(audio_features['audio'].shape[1] / hop_size)
        n_samples = time_steps * hop_size

        gin_params = [
            f'Harmonic.n_samples = {n_samples}',
            f'FilteredNoise.n_samples = {n_samples}',
            f'F0LoudnessPreprocessor.time_steps = {time_steps}',
            'oscillator_bank.use_angular_cumsum = True'
        ]

        with gin.unlock_config():
            gin.parse_config(gin_params)

        for key in ['f0_hz', 'f0_confidence', 'loudness_db']:
            audio_features[key] = audio_features[key][:time_steps]
        audio_features['audio'] = audio_features['audio'][:, :n_samples]

        return audio_features

    def synthesize_audio(self, input_song, audio_features, output_dir, sample_rate=16000):
        """Synthesizes audio using the model and displays original and synthesized audio."""
        if self.model is None:
            raise ValueError("Model not loaded. Please load the model first.")

        start_time = time.time()
        outputs = self.model(audio_features, training=False)
        audio_gen = self.model.get_audio_from_outputs(outputs)
        print('Prediction took %.1f seconds' % (time.time() - start_time))

        # print('Original Audio:')
        # display(Audio(original_audio, rate=sample_rate))

        # print('Synthesized Audio:')
        # display(Audio(audio_gen, rate=sample_rate))
        output_dir = os.path.normpath(output_dir)
        print("outputdirc is " + output_dir)

        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        song_name = os.path.splitext(os.path.basename(input_song))[0]
        print("song name is " + song_name)
        file_name = f"{song_name}_{self.model_name}.wav"
        print("____ " + file_name)
        file_path = os.path.join(output_dir, file_name)
        print("file_name is  " + file_path)

        # Convert audio to the correct format for saving
        # DDSP outputs float32 values in [-1, 1]
        # audio_gen = np.array(audio_gen)
        # if audio_gen.ndim > 1:
        #     audio_gen = audio_gen.squeeze()

        # Save the generated audio
        try:
            sf.write(file_path, audio_gen, sample_rate)
            print(f"Generated audio saved successfully at: {file_path}")
        except Exception as e:
            print(f"Error saving audio file: {e}")
            print(f"Debug info:")
            print(f"Audio shape: {audio_gen.shape}")
            print(f"Audio dtype: {audio_gen.dtype}")
            print(f"Audio min/max: {audio_gen.min():.3f}/{audio_gen.max():.3f}")



class InstrumentalConverter:
    def __init__(self, input_song, output_dir, model_name="violin"):
        """
        Initializes the InstrumentalConverter pipeline.
        :param input_song: Path to the input song (mp4 format).
        :param output_dir: Directory to save outputs.
        :param model_name: Instrument model name.
        """
        self.input_song = input_song
        self.output_dir = output_dir
        # self.vocal_separator = VocalSeparator()
        self.audio_processor = AudioProcessor(model_name)

    def convert_to_instrumental(self):
        """
        Executes the end-to-end pipeline of vocal separation and instrumental conversion.
        """
        try:
            # print("Starting vocal separation...")
            # self.vocal_separator.separate_vocals(self.input_song, self.output_dir)

            # vocal_path = os.path.join(self.output_dir, "vocals.wav")
            vocal_path = self.input_song
            if not os.path.exists(vocal_path):
                raise FileNotFoundError("Vocals file not found after separation.")

            print("Loading and processing audio...")
            self.audio_processor.load_model()
            audio, audio_features = self.audio_processor.preprocess_audio(vocal_path)

            print("Adjusting model parameters...")
            adjusted_features = self.audio_processor.adjust_model_parameters(audio_features)

            print("Synthesizing instrumental audio...")
            self.audio_processor.synthesize_audio(self.input_song, adjusted_features, self.output_dir)

        except Exception as e:
            print(f"Error during conversion: {e}")
