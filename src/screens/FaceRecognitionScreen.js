import React, { useEffect, useState, useRef } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import CustomButton from '../components/HeadingButton';
import { useNavigate } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import { useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';

const FaceRecognitionScreen = () => {
    const { speak, cancel } = useSpeechSynthesis(); 
    const navigate = useNavigate();

    const [recognizedFaces, setRecognizedFaces] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const isMounted = useRef(false);  
    const hasSpoken = useRef(false);  

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (isMounted.current) return; 
        isMounted.current = true; 
        axios.get('http://localhost:8000/identifyFaces')
            .then(response => {
                console.log("Response API", response);
                const faces = response.data.identified_faces;
                if (faces.length > 0) {
                    setRecognizedFaces(faces);
                    setImageUrl(faces[0].image_url);  

                    if (!hasSpoken.current) {
                        const faceNames = faces.map(face => face.name).join(', ');
                        speak({ text: `${faceNames} are in front of you.` });
                        hasSpoken.current = true; 
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching identified faces:', error);
            });
        
        return () => {
            cancel(); 
        };
    }, [speak, cancel]);

    const handleBackClick = () => {
        cancel(); 
        navigate('/'); 
    };

    return (
        <div style={{ padding: 20, textAlign: 'center' }}>
            <CustomButton
                icon={<FaceIcon />}
                text="Recognized Faces"
                onClick={handleBackClick} 
            />
            <div style={{ padding: 20, textAlign: 'center' }}>
                {imageUrl && (
                    <div>
                        <img src={imageUrl} alt="Identified Faces" style={{ maxWidth: '100%', marginBottom: 20 }} />
                    </div>
                )}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}>
                    {recognizedFaces.map((face, index) => (
                        <div key={index} style={{ 
                            textAlign: 'center', 
                            margin: isMobile ? '10px 0' : '0 20px' 
                        }}>
                            <p style={{ margin: 0 }}>{face.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaceRecognitionScreen;
