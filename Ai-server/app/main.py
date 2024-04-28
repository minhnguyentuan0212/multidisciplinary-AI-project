import sys
sys.path.append('./app/speech')
sys.path.append('./app/speech/utils')
sys.path.append('./app/')

from fastapi import FastAPI
from speech.speech_controller import speechController
import uvicorn

from fastapi.middleware.cors import CORSMiddleware
origins = [
    "*"
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(speechController,prefix='/speech')

def main():
    uvicorn.run("main:app", host="0.0.0.0", port=9999, reload=True)

if __name__ == "__main__":
    main()
