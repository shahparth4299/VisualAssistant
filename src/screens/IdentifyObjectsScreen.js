import React, { useState, useEffect, useRef } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CustomButton from '../components/HeadingButton';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';

const IdentifyObjectsScreen = () => {
    const navigate = useNavigate();
    const { speak, cancel } = useSpeechSynthesis();

    const [identifiedObjects, setIdentifiedObjects] = useState([]);
    const isMounted = useRef(false);  
    const hasSpoken = useRef(false);  

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (isMounted.current) return; 
        isMounted.current = true; 
        const fetchIdentifiedObjects = async () => {
            try {
                const response = await axios.get('http://localhost:8000/startObjectDetection');
                
                if (response.data && Array.isArray(response.data['Identified Objects'])) {
                    setIdentifiedObjects(response.data['Identified Objects']);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching identified objects:', error);
            }
        };
        fetchIdentifiedObjects();
        return () => {
            cancel(); 
        };
    }, [cancel]);
    useEffect(() => {
        if (identifiedObjects.length > 0 && !hasSpoken.current) {
            speak({ text: `I can see a ${identifiedObjects.join(', ')}.` });
            hasSpoken.current = true; 
        }
    }, [identifiedObjects, speak]);

    const handleBackClick = () => {
        cancel(); 
        navigate('/'); 
    };

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
                onClick={handleBackClick} 
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
