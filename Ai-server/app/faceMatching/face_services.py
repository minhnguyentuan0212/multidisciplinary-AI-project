import numpy as np

from FaceMatching import FaceMatching
from LiveChecking import LiveChecking
import json
def faceMatching(img):
    ## connect DB to retrieve all sample images of userId
    with open('samples.json', 'r') as file:
        samples = json.load(file)
    # samples = {}

    faceMatching = FaceMatching()

    minDist = 1000
    minUser = ""
    
    for user in samples:
        for base_img in samples[user]:
            print(np.array(base_img), np.array(base_img).shape)
            # print()
            dist = faceMatching(np.array(base_img),img)
            if dist < minDist:
                minDist = dist
                minUser = user
    return {'distance': minDist, 'user': minUser}

def liveChecking():
    ## connect DB to retrieve all sample images of userId
    def printout(frame):
        return faceMatching(frame)
    liveChecking = LiveChecking(printout)
    img = liveChecking()
    return np.array(img)
