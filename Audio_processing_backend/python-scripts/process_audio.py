# import librosa
# import soundfile as sf
# import sys
# import audioread
# import time  # To check how long loading takes

# def process_audio(input_file, output_file):
#     try:
#         # Log the start time
#         start_time = time.time()

#         # Check if the file exists and print path
#         print(f"Attempting to load the audio file from: {input_file}")

#         # Load the audio file using librosa (audioread will handle MP3 decoding)
#         print("Starting to load audio file...")
#         y, sr = librosa.load(input_file, sr=None)
#         print("Audio file loaded successfully!")

#         # Log the time taken to load
#         load_time = time.time() - start_time
#         print(f"Audio file loaded in {load_time:.2f} seconds.")

#         # Example operation: Reduce the volume by half
#         y_processed = y * 0.5

#         # Save the processed audio file
#         print(f"Saving processed audio to {output_file}...")
#         sf.write(output_file, y_processed, sr)
#         print("Processing complete!")
#     except audioread.DecodeError:
#         print("Error: Could not decode the audio file. Please check the file format.")
#     except Exception as e:
#         print(f"Error: {e}")

# if __name__ == "__main__":
#     if len(sys.argv) < 3:
#         print("Usage: python script.py <input_file> <output_file>")
#     else:
#         input_file = sys.argv[1]
#         output_file = sys.argv[2]
#         process_audio(input_file, output_file)

import librosa
import soundfile as sf
import sys
import audioread
import time  # To check how long loading takes

def process_audio(input_file, output_file):
    try:
        # Log the start time
        start_time = time.time()

        # Check if the file exists and print path
        print(f"Attempting to load the audio file from: {input_file}")
        sys.stdout.flush()  # Ensure output is immediately flushed

        # Load the audio file using librosa (audioread will handle MP3 decoding)
        print("Starting to load audio file...")
        sys.stdout.flush()  # Flush after printing
        y, sr = librosa.load(input_file, sr=None)
        print(f"Audio file loaded successfully with sample rate {sr} and data shape {y.shape}")
        sys.stdout.flush()  # Flush after printing

        # Log the time taken to load
        load_time = time.time() - start_time
        print(f"Audio file loaded in {load_time:.2f} seconds.")
        sys.stdout.flush()  # Flush after printing

        # Example operation: Reduce the volume by half
        y_processed = y * 0.5

        # Save the processed audio file
        print(f"Saving processed audio to {output_file}...")
        sys.stdout.flush()  # Flush after printing
        sf.write(output_file, y_processed, sr)
        print("Processing complete!")
        sys.stdout.flush()  # Flush after printing
    except audioread.DecodeError:
        print("Error: Could not decode the audio file. Please check the file format.")
        sys.stdout.flush()  # Flush after printing
    except Exception as e:
        print(f"Error during processing: {e}")
        sys.stdout.flush()  # Flush after printing

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python process_audio.py <input_file> <output_file>")
        sys.stdout.flush()  # Flush after printing
    else:
        input_file = sys.argv[1]
        output_file = sys.argv[2]
        process_audio(input_file, output_file)
