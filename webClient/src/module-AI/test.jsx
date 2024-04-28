import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { read_audio } from "@xenova/transformers";
const mimeType = "audio/wav"; // Change mimeType to match the desired audio format
const AudioRecorders = () => {
  const recorderControls = useAudioRecorder();
  const addAudioElement = async (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    let tensor = await read_audio(url, 48000);
    const arr = [];
    for (var i in tensor) {
      arr.push(tensor[i]);
    }
    const arrayBlob = new Blob([JSON.stringify(arr)], {
      type: "application/json",
    });
    const arrayFile = new File([arrayBlob], "arrayData.json");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("file", arrayFile);
    try {
      let res = await axios.post(
        "http://localhost:9999/speech/",
        formData,
        config
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={async (blob) => await addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
    </div>
  );
};

export default AudioRecorders;
