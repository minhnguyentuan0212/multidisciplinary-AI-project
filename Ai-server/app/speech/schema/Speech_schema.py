from pydantic import BaseModel
class SpeechQuerySchema(BaseModel):
    key:object
    value: str