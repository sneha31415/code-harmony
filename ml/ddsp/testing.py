from ddsp_conversion import *
if __name__ == '__main__':
    input_song = os.path.abspath("input_dir/vocals.mp4") 
    output_dir = os.path.abspath("./final_output")   
    model_name = "violin"     

    converter = InstrumentalConverter(input_song, output_dir, model_name)
    converter.convert_to_instrumental()
