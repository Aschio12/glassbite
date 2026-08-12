import glob
from rembg import remove, new_session
from PIL import Image

def process_images():
    # Initialize the isnet-general-use session
    session = new_session("isnet-general-use")
    images = glob.glob('public/images/*.jpg')
    for img_path in images:
        out_path = img_path.replace('.jpg', '_transparent.png')
        print(f'Processing {img_path} with isnet-general-use...')
        with open(img_path, 'rb') as i:
            with open(out_path, 'wb') as o:
                input_data = i.read()
                # Remove using the new session, without alpha matting first as IS-Net is usually crisp
                output_data = remove(
                    input_data,
                    session=session,
                    post_process_mask=True
                )
                o.write(output_data)

process_images()
print("All images processed with isnet-general-use.")
