from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq
from torchaudio.transforms import Resample
from Singleton import Singleton
import torch


class ModelInference(metaclass=Singleton):
    def __init__(self) -> None:
        self.resample = Resample(48000,16000)
        self.proc = AutoProcessor.from_pretrained("vinai/PhoWhisper-small")
        self.model = AutoModelForSpeechSeq2Seq.from_pretrained("vinai/PhoWhisper-small")
        self.model.eval()
    def __call__(self,audio:torch.Tensor):
        with torch.no_grad():
            i = self.resample(audio)
            i = self.proc(i,sampling_rate=16000, return_tensors="pt").input_features
            o = self.model.generate(i,max_length=50)
            o = self.proc.batch_decode(o, skip_special_tokens=True)[0]
            return o