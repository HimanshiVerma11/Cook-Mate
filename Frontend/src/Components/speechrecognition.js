


export const speechrecognition = (onCommand) => {
  const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    console.log("Voice command heard:", transcript);

    if (["play", "pause", "back", "next"].includes(transcript)) {
      console.log("Identified the voice")  
      onCommand(transcript);
    }
  };

  return {
    startListening: () => recognition.start(),
    stopListening: () => recognition.stop(),
  };
};
