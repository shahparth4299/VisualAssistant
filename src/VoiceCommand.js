import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';

const VoiceCommand = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [response, setResponse] = useState('');
  const { speak, cancel } = useSpeechSynthesis();

  const isBrowserSupported = SpeechRecognition.browserSupportsSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      handleVoiceCommand(transcript);
    }
  }, [transcript]);

  const handleVoiceCommand = (command) => {
    switch (command.toLowerCase()) {
      case 'identify objects':
        console.log ("Indetify Objects Triggered...")
        fetchIdentifyObjectsAPI();
        break;
      case 'recognize faces':
        fetchRecognizeFacesAPI();
        break;
      case 'reading mode':
        fetchReadingModeAPI();
        break;
      case 'give instructions':
        giveInstructions();
        break;
      case 'stop instructions':
        cancel();
        break;
      default:
        speak({ text: "Sorry, I didn't understand that command." });
    }
  };

  const fetchIdentifyObjectsAPI = async () => {
    try {
      //const response = await fetch('API_ENDPOINT_IDENTIFY_OBJECTS');
      //const data = await response.json();
      //setResponse(data.message);
      speak({ text: "I can see laptop bottle clock" });
    } catch (error) {
      console.error('Error identifying objects:', error);
    }
  };

  const fetchRecognizeFacesAPI = async () => {
    try {
      //const response = await fetch('API_ENDPOINT_RECOGNIZE_FACES');
      //const data = await response.json();
      //setResponse(data.message);
      //speak({ text: data.message });
      const faceRecognitionResponse = "Parth Shah, Manthan Kansara are in front of you.";
      speak({text: faceRecognitionResponse});
    } catch (error) {
      console.error('Error recognizing faces:', error);
    }
  };

  const fetchReadingModeAPI = async () => {
    try {
      //const response = await fetch('API_ENDPOINT_READING_MODE');
      //const data = await response.json();
      //setResponse(data.message);
      //speak({ text: data.message });
      const readingModeResponse = "Do not enter in room G.01, lecture going on in the room.";
    } catch (error) {
      console.error('Error in reading mode:', error);
    }
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 3000);
  };

  const giveInstructions = () => {
    const instructions = `
      Welcome to the Visual Assistant App. Here are the instructions:
      
      1. Reading Mode: Say 'Reading Mode' to activate this feature. Reading Mode will read out loud the information in front of you, such as text on signs, labels, or documents.
      
      2. Object Identification: Say 'Identify Objects' to activate this feature. Object Identification will identify and describe the objects in front of you, helping you understand your surroundings.
      
      3. Face Recognition: Say 'Recognize Faces' to activate this feature. Face Recognition will identify people in front of you by recognizing their faces, helping you know who is around you.
      
      Press the 'Speak' button and say the command clearly.
    `;
    speak({ text: instructions });
  };

  if (!isBrowserSupported) {
    return <div>Browser does not support speech recognition.</div>;
  }

  return (
    <div>
      <button onClick={startListening}>Speak</button>
      <p>{transcript}</p>
      <p>{response}</p>
    </div>
  );
};

export default VoiceCommand;
