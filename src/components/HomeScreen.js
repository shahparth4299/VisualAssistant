import React from 'react';
import { Grid } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FaceIcon from '@mui/icons-material/Face';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import VoiceCommandButton from './VoiceCommandButton';
import CustomButton from './CustomButton'; 
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: 20, textAlign: 'center' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <CustomButton
                        icon={<ImportContactsIcon />}
                        text="Reading Mode"
                        onClick={() => navigate('/reading')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomButton
                        icon={<CheckCircleIcon />}
                        text="Identify Objects"
                        onClick={() => navigate('/identify-objects')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomButton
                        icon={<FaceIcon />}
                        text="Face Recognition"
                        onClick={() => navigate('/face-recognition')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomButton
                        icon={<BookmarkIcon />}
                        text="Instructions"
                        onClick={() => navigate('/instructions')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <VoiceCommandButton />
                </Grid>
            </Grid>
        </div>
    );
};

export default HomeScreen;
