from utils.asr_model import ModelInference
from utils.database_connection import DatabaseConnection
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import torch

ModelInference = ModelInference()
db = DatabaseConnection()

async def transcript(audio:torch.Tensor):
    q = ModelInference(audio)
    print("Query: ",q)
    res = db.searchString(q)
    data = jsonable_encoder(res)
    data['query'] = q
    return JSONResponse(content=data)