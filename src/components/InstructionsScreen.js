import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const InstructionsScreen = () => {
  const [response, setResponse] = useState('');
  const { speak, cancel, speaking, supported } = useSpeechSynthesis();

  useEffect(() => {
    if (supported) {
      giveInstructions();
    } 
   
    return () => {
      if (speaking) {
        cancel();
      }
    };
  }, [speaking, supported]);

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

  return (
    <div style={{ padding: 20, color: '#1F2833' }}>
      <h2>Instructions</h2>
      <p>
        Welcome to the Visual Assistant App. Here are the instructions:
      </p>
      <ol>
        <li>Reading Mode: Say 'Reading Mode' to activate this feature. Reading Mode will read out loud the information in front of you, such as text on signs, labels, or documents.</li>
        <li>Object Identification: Say 'Identify Objects' to activate this feature. Object Identification will identify and describe the objects in front of you, helping you understand your surroundings.</li>
        <li>Face Recognition: Say 'Recognize Faces' to activate this feature. Face Recognition will identify people in front of you by recognizing their faces, helping you know who is around you.</li>
      </ol>
      <p>To use any of these features, press the 'Speak' button and say the command clearly. The app will confirm your command and provide the necessary information.</p>
      <p>If you need further assistance, don't hesitate to ask for help or repeat your command.</p>
    </div>
  );
};

export default InstructionsScreen;
