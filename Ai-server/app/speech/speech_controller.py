from fastapi import APIRouter,File, UploadFile
import speech_service as ss
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import numpy as np
import torch
import torchaudio
import json
from schema.Speech_schema import SpeechQuerySchema
speechController = APIRouter()

@speechController.post("/")
async def transcript(file: UploadFile = File(...)):
    content = await file.read()
    data= list(map(float,json.loads(content)))
    input_tensor = torch.tensor(data).float()
    res = await ss.transcript(input_tensor)
    print(res.body)
    return res
    
@speechController.get("/")
async def hello():
    return JSONResponse(content=jsonable_encoder({"msg":"hello welcome to speech services"}))

