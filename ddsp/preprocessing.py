# preprocessing
import librosa
import soundfile as sf

audio, sr = librosa.load('../spleeter/output_directory/aeDilHaiMushkil/vocals.wav', sr=16000)
sf.write('vocals_preprocessed.wav', audio, sr)

# import os
# print(os.path.exists('../spleeter/output_directory/aeDilHaiMushkil/vocals.wav'))


