import React, { useState } from 'react'
import './output.css';
import axios from 'axios';
import { useEffect } from 'react';
import { speechrecognition } from './speechrecognition';

export default function Output({InputValue}) {


  var [isPlaying, setIsPlaying] = useState(false);
  const steps = InputValue;
  let mounted = true;
  var [currentStepIndex, setCurrentStepIndex] = useState(0);

  //Speak intro on mount
  useEffect(() => {
    axios.post("http://127.0.0.1:8000/narrate",{
        "text" : "Hey! I am your virtual cooking assistant and I will be guiding you throughout your journey of making delicious recipes. Please hit the play button to start with assembling the ingredients."
    })
      .then(() => console.log("Intro played"))
      .catch(() => console.log("Error playing intro"));
  }, []);

  //Narration step
  const narrateStep = async (stepText) => {
    try{
      await axios.post("http://127.0.0.1:8000/narrate", {
        text : stepText
      });
      console.log("Narration completed in frontend!")
    }
    catch{
      console.log("Error in narration!")
    }
  }

  // Auto narration loop
  useEffect(() => {
    const startNarration = async () => {
      let localStepIndex = currentStepIndex;
      while (isPlaying && localStepIndex < steps.length && mounted) {

        try{
          await narrateStep(steps[localStepIndex]);
          localStepIndex += 1;
          if(mounted){
              setCurrentStepIndex(localStepIndex);
          }
        } catch(error){
          console.error("Error during auto-narration step:", error);
          if(mounted){
            setIsPlaying(false);
          }
          break;
        }
      }
      if (mounted && localStepIndex >= steps.length -1 && steps.length > 0) {
        setIsPlaying(false);
    }
    };

    if (isPlaying && steps && steps.length > 0) {
      startNarration();
    }

    return () => {
      mounted = false;
      if(isPlaying){
        axios.post("http://127.0.0.1:8000/narrate", { text: "stop" })
             .catch(err => console.error("Error sending stop on unmount/cleanup", err));
      }
    }
  }, [isPlaying]);


  const handlePlayPause = () => {
    const newIsPlaying = !isPlaying; 
    setIsPlaying(newIsPlaying);
    if (!newIsPlaying || (currentStepIndex > steps.length -1 && steps.length > 0 )) { //if paused
      narrateStep("stop");
    }
  };

  const handleBack = async () => {
    if(currentStepIndex > 0){
      setIsPlaying(false);
      await narrateStep("stop");
      const newIndex = currentStepIndex - 1;
      setCurrentStepIndex(newIndex);
      await narrateStep(steps[newIndex]);
    }
  };

   const handleNext = async () => {
    if(currentStepIndex < steps.length - 1){
      setIsPlaying(false);
      await narrateStep("stop");
      const newIndex = currentStepIndex + 1 ;
      setCurrentStepIndex(newIndex);
      await narrateStep(steps[newIndex]);
    }
  };


  const handleVoiceCommand = (command) => {
    if (command === "play" || command === "pause") handlePlayPause();
    if (command === "back") handleBack();
    if (command === "next") handleNext();
  };

  const { startListening, stopListening } = speechrecognition(handleVoiceCommand);

  useEffect(() => {
    startListening();
    return () => stopListening();
  }, []);


  return (
    <div className='output'>
        <div className='animation-2'>
           <img src='/assets/LottieLoader.gif' alt='Loader'></img>
        </div>
        <div className='buttons'>
          <button id="previous" onClick={handleBack}>⏮️</button>
          <button id="play-pause" onClick={handlePlayPause}>{isPlaying ? "⏸️" : "▶️" }</button>
          <button id="next" onClick={handleNext}>⏭️</button>
        </div>
        <div className='transcript'>
            <textarea  rows="15" cols="50" value={steps[currentStepIndex]} readOnly></textarea>
        </div>
    </div>
  )
}
