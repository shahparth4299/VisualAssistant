import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import FaceIcon from '@mui/icons-material/Face';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const NavigationDrawer = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setOpen(open);
    };

  return (
    <>
      <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div style={{ width: 250, backgroundColor: '#1F2833', height: '100%', color: 'white' }}>
          <List>
            <ListItem button key="Home" onClick={()=>navigate('/')}>
              <ListItemIcon><HomeIcon style={{ color: '#66FCF1' }} /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="ImportContancts" onClick={()=>('/reading')}>
              <ListItemIcon><ImportContactsIcon style={{ color: '#66FCF1' }} /></ListItemIcon>
              <ListItemText primary="Reading Mode" />
            </ListItem>
            <ListItem button key="IndetifyOjects" onClick={()=>navigate('/identify-objects')}>
              <ListItemIcon><CheckCircleIcon style={{ color: '#66FCF1' }} /></ListItemIcon>
              <ListItemText primary="Identify Objects" />
            </ListItem>
            <ListItem button key="FaceRecognition" onClick={()=>navigate('/face-recognition')}>
              <ListItemIcon><FaceIcon style={{ color: '#66FCF1' }} /></ListItemIcon>
              <ListItemText primary="Face Recognition" />
            </ListItem>
            <ListItem button key="CurrencyDetection">
              <ListItemIcon><PaymentIcon style={{ color: '#66FCF1' }} /></ListItemIcon>
              <ListItemText primary="Detect Currency" />
            </ListItem>
            <ListItem button key="UploadFile">
              <ListItemIcon><UploadFileIcon style={{ color: '#66FCF1' }} /></ListItemIcon>
              <ListItemText primary="Upload FIle" />
            </ListItem>
            <ListItem button key="InstructionsScreen" onClick={()=>navigate('instructions')}>
              <ListItemIcon><MenuBookIcon style={{ color: '#66FCF1' }} /></ListItemIcon>
              <ListItemText primary="Instructions" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default NavigationDrawer;
