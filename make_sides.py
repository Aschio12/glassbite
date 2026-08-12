from PIL import Image
import numpy as np

# Create Sweet Potato Fries by tinting regular fries more orange
img = Image.open('public/images/side_fries.jpg').convert('RGB')
data = np.array(img)

# Simple color shift: boost red and reduce blue for non-white pixels
# White background is close to [255, 255, 255]
mask = (data[:, :, 0] < 240) | (data[:, :, 1] < 240) | (data[:, :, 2] < 240)

# Apply shift to non-background
data[mask, 0] = np.clip(data[mask, 0] * 1.2, 0, 255) # More red
data[mask, 1] = np.clip(data[mask, 1] * 0.9, 0, 255) # Less green
data[mask, 2] = np.clip(data[mask, 2] * 0.7, 0, 255) # Less blue

new_img = Image.fromarray(data)
new_img.save('public/images/side_sweet_potato.jpg')

print("Created Sweet Potato Fries")
