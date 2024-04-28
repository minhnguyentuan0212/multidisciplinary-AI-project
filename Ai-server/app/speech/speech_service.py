from utils.asr_model import ModelInference
from utils.database_connection import DatabaseConnection
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import torch

ModelInference = ModelInference()
db = DatabaseConnection()

async def transcript(audio:torch.Tensor):
    q = ModelInference(audio)
    res = db.searchString(q)
    return JSONResponse(content=jsonable_encoder(res))