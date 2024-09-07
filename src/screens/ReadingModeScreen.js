import React, { useState, useEffect, useRef } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CustomButton from '../components/HeadingButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReadingModeScreen = () => {
    const { speak, cancel } = useSpeechSynthesis(); 
    const navigate = useNavigate();
    
    const [recognizedText, setRecognizedText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const isMounted = useRef(false);  
    const hasSpoken = useRef(false);  

    useEffect(() => {
        if (isMounted.current) return; 
        isMounted.current = true; 

        axios.get('http://localhost:8000/captureAndReadText')
            .then(response => {
                const { identified_text, image_url } = response.data;
                setRecognizedText(identified_text);
                setImageUrl(image_url);

                if (identified_text && !hasSpoken.current) {
                    speak({ text: identified_text });
                    hasSpoken.current = true;
                }
            })
            .catch(error => {
                console.error('Error fetching recognized text:', error);
            });
        return () => {
            cancel(); 
        };
    }, [speak, cancel]);

    const handleBackClick = () => {
        cancel(); 
        navigate('/'); 
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    };

    const blockStyle = {
        flex: 1,
        textAlign: 'center',
        maxWidth: 400,
        height: 400, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F2833',
        color: '#66FCF1',
        padding: 20,
        margin: '10px 0', 
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    const mobileStyle = {
        flexDirection: 'column',
        height: 'auto',
    };

    return (
        <div style={{ padding: 20, textAlign: 'center' }}>
            <CustomButton
                icon={<ImportContactsIcon />}
                text="Reading Mode"
                onClick={handleBackClick} 
            />
            <div style={{...containerStyle, ...(window.innerWidth <= 768 ? mobileStyle : {})}}>
                <div style={{ ...blockStyle, height: window.innerWidth <= 768 ? '300px' : '400px' }}>
                    {imageUrl && <img src={imageUrl} alt="Captured" style={imageStyle} />}
                </div>
                <div style={{ ...blockStyle, height: window.innerWidth <= 768 ? '300px' : '400px' }}>
                    <div>
                        <h2>Output</h2>
                        <p>{recognizedText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadingModeScreen;
