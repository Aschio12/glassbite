import os
from rembg import remove, new_session
from PIL import Image

def process_images():
    images_to_process = [
        'public/images/margherita_pizza.jpg',
        'public/images/dessert_cake.jpg',
        'public/images/chicken_burger.jpg',
        'public/images/bacon_burger.jpg',
        'public/images/classic_burger.jpg'
    ]
    
    session = new_session("isnet-general-use")
    
    for img_path in images_to_process:
        if not os.path.exists(img_path):
            continue
        out_path = img_path.replace('.jpg', '_transparent.png')
        print(f'Processing {img_path} with isnet-general-use...')
        with open(img_path, 'rb') as i:
            with open(out_path, 'wb') as o:
                input_data = i.read()
                # Remove background for pure white isolated images
                output_data = remove(
                    input_data,
                    session=session,
                    post_process_mask=True
                )
                o.write(output_data)

process_images()
print("Specific images processed with IS-Net.")
