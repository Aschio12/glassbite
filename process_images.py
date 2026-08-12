from rembg import remove
import glob
import os

def process_images():
    images = glob.glob('public/images/*.jpg')
    for img_path in images:
        out_path = img_path.replace('.jpg', '_transparent.png')
        print(f'Processing {img_path} with rembg alpha matting...')
        with open(img_path, 'rb') as i:
            with open(out_path, 'wb') as o:
                input_data = i.read()
                # Try alpha matting to erode the edges
                output_data = remove(
                    input_data, 
                    alpha_matting=True, 
                    alpha_matting_foreground_threshold=240,
                    alpha_matting_background_threshold=10,
                    alpha_matting_erode_size=15, # Erode the mask by 15 pixels to cut off the dark glow
                    post_process_mask=True
                )
                o.write(output_data)

process_images()
print("All images processed with rembg alpha matting.")
