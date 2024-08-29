import React, {useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigationDrawer from './NavigationDrawer';

const Header = ({ onMenuClick }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <AppBar position="static" style={{ backgroundColor: '#1F2833' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onMenuClick}>
        <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Visual Assistant
        </Typography>
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
