import React, { useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CustomButton from '../components/HeadingButton';
import { useNavigate } from 'react-router-dom';

const ReadingModeScreen = () => {
    const { speak } = useSpeechSynthesis();
    const navigate = useNavigate();
    
    const recognizedText = "MPT JUNIOR 1.15 FIRST FLOOR WESTERN GATEWAY BUILDING";  
    const imageSrc = 'images/reading.png'; 

    useEffect(() => {
        speak({ text: recognizedText });
    }, []);  

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
                        onClick={() => navigate('/reading')}
                    />
        <div style={{...containerStyle, ...(window.innerWidth <= 768 ? mobileStyle : {})}}>
            <div style={{ ...blockStyle, height: window.innerWidth <= 768 ? '300px' : '400px' }}>
                <img src={imageSrc} alt="Captured" style={imageStyle} />
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
