#!/usr/bin/env python3
import torchvision
import torch
from PIL import Image
import numpy as np
from packaging import version
import platform
from pathlib import Path
from models.FaceMatch import FaceEmb

class FaceMatching:
    def __init__(self):
        self.model = FaceEmb()
    
    def __call__(self, base_img, check_img):
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(device)
        transforms = torchvision.transforms.ToTensor()

        # Read the two images and transform them to tensors
        # img1 = PIL.Image.open(base_img).convert('RGB')
        base_img = base_img.astype(np.uint8)
        img1 = Image.fromarray(base_img).convert('RGB')
        img1 = img1.resize((250, 250), Image.BICUBIC)
        img1 = transforms(img1)
        img1 = img1.unsqueeze(0)
        img1 = img1.to(device)
        
        # img2 = Image.open(check_img).convert('RGB')
        check_img = check_img.astype(np.uint8)
        img2 = Image.fromarray(check_img).convert('RGB')
        img2 = img2.resize((250, 250), Image.BICUBIC)
        img2 = transforms(img2)
        img2 = img2.unsqueeze(0)
        img2 = img2.to(device)

        # Define your model
        model = self.model.to(device)
        model.load_state_dict(torch.load('./weights/model.pt', map_location=torch.device('cpu')))
        # embedd the images into vectors
        out_img1 = model.backbone(img1)
        out_img2 = model.backbone(img2)
        
        # compute euclidian distance
        distance = torch.cdist(out_img1, out_img2)
        distance = distance.item()

        return distance

# if __name__ == "__main__":
#     import argparse
#     parser = argparse.ArgumentParser()
#     parser.add_argument('--path_img1', type=Path)
#     parser.add_argument('--path_img2', type=Path)
#     args = parser.parse_args()
#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#     threshold = 1.1 # thresold to classify the imag to positive or negative (set to 1.1 same to facenet)
#     transforms = torchvision.transforms.ToTensor()

#     # Read the two images and transform them to tensors
#     img1 = PIL.Image.open(args.path_img1).convert('RGB')
#     img1 = transforms(img1)
#     img1 = img1.unsqueeze(0)
#     img1 = img1.to(device)
    
#     img2 = PIL.Image.open(args.path_img2).convert('RGB')
#     img2 = transforms(img2)
#     img2 = img2.unsqueeze(0)
#     img2 = img2.to(device)

#     # define your model
#     model = FaceEmb()
#     model = model.to(device)
#     model.load_state_dict(torch.load('./weights/model.pt'))

#     # embedd the images into vectors
#     out_img1 = model.backbone(img1)
#     out_img2 = model.backbone(img2)
    
#     # compute euclidian distance
#     distance = torch.cdist(out_img1, out_img2)
#     distance = distance.item()

#     # decide whether it is the same person or it is different
#     if distance <= threshold:
#         print("Same, distance = ", distance)
#     else:
#         print("Different, distance =", distance)