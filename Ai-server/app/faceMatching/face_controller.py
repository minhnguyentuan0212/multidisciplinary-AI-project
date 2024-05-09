from fastapi import APIRouter,File, UploadFile
import face_services as fs
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import numpy as np
import torch
import torchaudio
import json
import PIL

faceController = APIRouter()

@faceController.post('/')
async def faceMatching():
    img = fs.liveChecking()
    res = fs.faceMatching(img)
    if res['distance'] > 2.1:
        res['match'] = False
    else:
        res['match'] = True
    return JSONResponse(res) ## Need modification