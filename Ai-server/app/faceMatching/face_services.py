from utils.database_connection import DatabaseConnection
from fastapi.encoders import jsonable_encoder
import numpy as np

from FaceMatching import FaceMatching
from LiveChecking import LiveChecking
db = DatabaseConnection()

async def faceMatching(img):
    ## connect DB to retrieve all sample images of userId
    samples = {}
    faceMatching = FaceMatching()

    minDist = 1000
    minUser = ""
    
    for user in samples:
        for base_img in samples[user]:
            dist = faceMatching(base_img,img)
            if dist < minDist:
                minDist = dist
                minUser = user

    return {'distance': minDist, 'user': minUser}

async def liveChecking(img):
    ## connect DB to retrieve all sample images of userId
    liveChecking = LiveChecking()
    img = liveChecking()
    return {'img': np.array(img)}
