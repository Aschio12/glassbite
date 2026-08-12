import glob
import os
from rembg import remove, new_session
from PIL import Image

def process_images():
    images = glob.glob('public/images/*.jpg')
    session = new_session("isnet-general-use")
    
    for img_path in images:
        out_path = img_path.replace('.jpg', '_v3.png')
        print(f'Processing {img_path} with isnet-general-use -> {out_path}')
        with open(img_path, 'rb') as i:
            with open(out_path, 'wb') as o:
                input_data = i.read()
                output_data = remove(
                    input_data,
                    session=session,
                    post_process_mask=True
                )
                o.write(output_data)

process_images()
print("All images processed and saved as _v3.png")
