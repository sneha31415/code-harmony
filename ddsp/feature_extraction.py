# feature extraction

import ddsp
import librosa
import ddsp.training
from ddsp.colab.colab_utils import download, play
import numpy as np

audio, sr = librosa.load('vocals_preprocessed.wav', sr=16000)
hop_size = 256
frame_rate = sr / hop_size

f0, f0_confidence = ddsp.training.metrics.compute_f0(audio, sample_rate=sr)
loudness = ddsp.training.metrics.compute_loudness(audio, sample_rate=sr)

output_path = "features.npz"
np.savez(output_path, f0=f0, loudness=loudness)