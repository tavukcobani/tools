import React from 'react';

import { AppBar, IconButton, Typography, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import Home from './Components/HomeComponent';


function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography variant="h6" >
            Agile Tools
            </Typography>
        </Toolbar>
      </AppBar>
      <Home></Home>
    </div>
  );
}

export default App;
