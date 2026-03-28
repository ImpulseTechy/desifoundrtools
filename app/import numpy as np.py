import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import os

def generate_chaotic_sequence(size, initial_val=0.5, params=(1.4, 0.3)):
    """
    Simulates a simplified chaotic trajectory representing the NN state.
    In the paper, this is derived from the FOBAMMCLVDNN master-slave system.
    """
    x = np.zeros(size)
    x[0] = initial_val
    a, b = params
    for i in range(1, size):
        # Simplified Henon-like map for demonstration of chaotic key generation
        x[i] = 1 - a * x[i-1]**2 + b * (x[i-2] if i > 1 else 0.1)
    return x

def process_image(image_path, key_params):
    # 1. Load the original RGB image
    if not os.path.exists(image_path):
        print(f"Error: The file {image_path} was not found.")
        return
    
    img = Image.open(image_path).convert('RGB')
    img_array = np.array(img)
    rows, cols, channels = img_array.shape
    total_pixels = rows * cols * channels

    # 2. Generate chaotic sequences (The 'Secret Key' from the NN states)
    chaotic_seq = generate_chaotic_sequence(total_pixels, **key_params)
    
    # 3. Create the encryption key (Normalize and convert to uint8)
    key = ((chaotic_seq - chaotic_seq.min()) / (chaotic_seq.max() - chaotic_seq.min()) * 255).astype(np.uint8)
    key = key.reshape(rows, cols, channels)

    # 4. Encryption (XOR)
    encrypted_array = np.bitwise_xor(img_array, key)
    
    # 5. Decryption (XORing again with the same key restores the image)
    decrypted_array = np.bitwise_xor(encrypted_array, key)
    
    # Display Results
    fig, ax = plt.subplots(1, 3, figsize=(15, 5))
    ax[0].imshow(img_array)
    ax[0].set_title("Original Image")
    
    ax[1].imshow(encrypted_array)
    ax[1].set_title("Encrypted (Chaotic)")
    
    ax[2].imshow(decrypted_array)
    ax[2].set_title("Decrypted Image")
    
    for a in ax: a.axis('off')
    plt.show()

# --- RUN BLOCK ---
if __name__ == "__main__":
    # REPLACE 'input.jpg' with the name of a real image file in your folder
    params = {'initial_val': 0.123, 'params': (1.4, 0.3)}
    process_image('your_image_here.jpg', params)