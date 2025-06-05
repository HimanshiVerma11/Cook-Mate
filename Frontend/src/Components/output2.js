import React, { useState, useEffect } from 'react';
import './output.css';

export default function Output({ InputValue }) {
  const steps = InputValue;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);

  // Initial Intro Narration
  useEffect(() => {
    speak("Hello! I am your virtual cooking assistant and I will be guiding you throughout your journey of making delicious recipes. Please hit the play button to start with assembling the ingredients.");
  }, []);

  const speak = (text, callback = null) => {
    // Cancel any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.75;
    utterance.pitch = 0;
    utterance.lang = 'en-US';
    // utterance.voice = 0;

    utterance.onend = () => {
      setIsNarrating(false);
      if (callback) callback();
    };

    setIsNarrating(true);
    window.speechSynthesis.speak(utterance);
  };

  // Auto Narration Logic
  useEffect(() => {
    let shouldStop = false;

    const narrateSteps = async () => {
      for (let i = currentStepIndex; i < steps.length; i++) {
        if (!isPlaying || shouldStop) break;

        await new Promise((resolve) => {
          speak(steps[i], () => {
            setCurrentStepIndex((prev) => prev + 1);
            resolve();
          });
        });
      }
      setIsPlaying(false);
    };

    if (isPlaying) narrateSteps();

    return () => {
      shouldStop = true;
      window.speechSynthesis.cancel();
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      window.speechSynthesis.cancel();
    } else {
      setIsPlaying(true);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setIsPlaying(false);
      window.speechSynthesis.cancel();
      const newIndex = currentStepIndex - 1;
      setCurrentStepIndex(newIndex);
      speak(steps[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setIsPlaying(false);
      window.speechSynthesis.cancel();
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      speak(steps[newIndex]);
    }
  };

  return (
    <div className='output'>
      <div className='animation-2'>
        <img src='/assets/LottieLoader.gif' alt='Loader' />
      </div>
      <div className='buttons'>
        <button id="previous" onClick={handleBack}>⏮️</button>
        <button id="play-pause" onClick={handlePlayPause}>{isPlaying ? "⏸️" : "▶️"}</button>
        <button id="next" onClick={handleNext}>⏭️</button>
      </div>
      <div className='transcript'>
        <textarea rows="15" cols="50" value={steps[currentStepIndex] || ""} readOnly />
      </div>
    </div>
  );
}
