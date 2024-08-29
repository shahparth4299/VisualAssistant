import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { useNavigate } from 'react-router-dom';

const VoiceCommandButton = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { speak, cancel, speaking, supported } = useSpeechSynthesis();
  const navigate = useNavigate();
  const isBrowserSupported = SpeechRecognition.browserSupportsSpeechRecognition();

  useEffect(() => {
    if (!isListening && transcript) {
      handleVoiceCommand(transcript);
    }
  }, [isListening, transcript]);

  const handleVoiceCommand = (command) => {
    switch (command.toLowerCase().trim()) {
      case 'identify':
        navigate('/identify-objects');
        console.log("Identify Objects Triggered...");
        //fetchIdentifyObjectsAPI();
        break;
      case 'faces':
        speak({ text: "Face Recognition started please wait" });
        navigate('/face-recognition');
        //fetchRecognizeFacesAPI();
        break;
      case 'reading':
        navigate('/reading');
        //fetchReadingModeAPI();
        break;
      case 'instruction':
        giveInstructions();
        break;
      case 'stop':
        cancel();
        break;
      default:
    }
  };

  const fetchIdentifyObjectsAPI = async () => {
    try {
      speak({ text: "I can see a laptop, bottle, and clock." });
    } catch (error) {
      console.error('Error identifying objects:', error);
    }
  };

  const fetchRecognizeFacesAPI = async () => {
    try {
      const faceRecognitionResponse = "Parth Shah, Manthan Kansara are in front of you.";
      speak({ text: faceRecognitionResponse });
    } catch (error) {
      console.error('Error recognizing faces:', error);
    }
  };

  const fetchReadingModeAPI = async () => {
    try {
      const readingModeResponse = "Do not enter room G.01, a lecture is going on in the room.";
      speak({ text: readingModeResponse });
    } catch (error) {
      console.error('Error in reading mode:', error);
    }
  };

  const startListening = () => {
    resetTranscript();
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true });
    setTimeout(() => {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }, 4000);
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
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <IconButton
          onClick={startListening}
          style={{ backgroundColor: '#1F2833', color: '#66FCF1', width: 140, height: 140 }}
        >
          <MicIcon style={{ fontSize: 80 }} />
        </IconButton>
      </div>
      <p>{transcript}</p>
      <p>{response}</p>
    </div>
  );
};

export default VoiceCommandButton;
