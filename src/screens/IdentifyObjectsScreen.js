import React, { useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CustomButton from '../components/HeadingButton';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';

const IdentifyObjectsScreen = () => {
    const navigate = useNavigate();
    const { speak } = useSpeechSynthesis();
    
    const identifiedObjects = ["Laptop", "Clock", "Monitor", "Desktop"]; 

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        speak({ text: `I can see a ${identifiedObjects.join(', ')}.` });
    }, [identifiedObjects, speak]);

    const buttonStyle = {
        height: '50px',
        width: isMobile ? '70%' : '25%',
        padding: 10,
        backgroundColor: '#1F2833',
        color: '#66FCF1',
        borderRadius: 5,
        border: 'none',
        cursor: 'pointer',
        textAlign: 'center',
        fontSize: '16px',
    };


    return (
        <div style={{ padding: 20, textAlign: 'center' }}>
            <CustomButton
                icon={<CheckCircleIcon />}
                text="Identified Objects"
                onClick={() => navigate('/reading')}
            />
            <div style={{ padding: 20, textAlign: 'center' }}>
                <div>
                    {identifiedObjects.map((object, index) => (
                        <div key={index} style={{ marginBottom: 10 }}>
                            <button style={buttonStyle}>
                                {object}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IdentifyObjectsScreen;