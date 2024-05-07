from utils.database_connection import DatabaseConnection
from fastapi.encoders import jsonable_encoder

from FaceMatching import FaceMatching
db = DatabaseConnection()

async def faceMatching(img):
    ## connect DB to retrieve all sample images of userId
    samples = None
    dists = []
    for base_img in samples:
        dists.append(FaceMatching(base_img, img))
    return {'distance': sum(dists)/len(dists)}