import React from 'react';
import { Button, useMediaQuery, useTheme } from '@mui/material';

const CustomButton = ({ icon, text, onClick }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const buttonStyle = {
        height: isMobile ? '50px' : '50px',
        width: isMobile ? '90%' : '30%',
        borderWidth: '4px',
        color: '#1F2833',
        borderColor: '#1F2833',
        borderRadius: 40,
        fontWeight: 'bold',
    };

    return (
        <Button
            variant="outlined"
            style={buttonStyle}
            startIcon={icon}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default CustomButton;
