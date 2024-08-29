import React, { useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import CustomButton from '../components/HeadingButton';
import { useNavigate } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import { useTheme, useMediaQuery } from '@mui/material';

const FaceRecognitionScreen = () => {
    const { speak } = useSpeechSynthesis();
    const navigate = useNavigate();
    
    const recognizedFaces = ["Sabin Tabirca", "Parth Shah", "Manthan Kansara"];

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const faceNames = recognizedFaces.join(', ');
        const speakAfterDelay = () => {
            speak({ text: `${faceNames} are in front of you.` });
        };
        const timer = setTimeout(speakAfterDelay, 5000);
        return () => clearTimeout(timer);
    }, [recognizedFaces, speak]);

    return (
        <div style={{ padding: 20, textAlign: 'center' }}>
            <CustomButton
                icon={<FaceIcon />}
                text="Recognized Faces"
                onClick={() => navigate('/reading')}
            />
            <div style={{ padding: 20, textAlign: 'center' }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}>
                    {recognizedFaces.map((name, index) => (
                        <div key={index} style={{ 
                            textAlign: 'center', 
                            margin: isMobile ? '10px 0' : '0 20px' 
                        }}>
                            <div style={{ 
                                width: 100, 
                                height: 100, 
                                backgroundColor: '#ccc', 
                                marginBottom: 10, 
                                margin: '0 auto' 
                            }}></div>
                            <p style={{ margin: 0 }}>{name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaceRecognitionScreen;
