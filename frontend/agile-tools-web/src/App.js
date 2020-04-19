import React from 'react';
import client from "socket.io-client";
import { Button, TextField, AppBar, IconButton, Typography, Toolbar , Grid} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';

let socket = client("localhost:4000");

socket.on('message', (message) => {
  console.log(`message from server: ${message.text}`);
});

function App() {


  return (
    <div className="App">
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
      <header className="App-header">
      <Grid container spacing={3}>
      <Grid item xs={6}>
        <p>
          Create & Join Session
        </p>
        <TextField id="new_user_name" label="User Name" variant="outlined" />
        <Button onClick={onBtnClick2} color="primary">Create Session</Button>
        </Grid>
        <Grid item xs={6}>
          <div>
        <p>
          Join Existing Session
        </p>
     
        <TextField id="name" label="User Name" variant="outlined" />
        <TextField id="room" label="Session Id" variant="outlined" />
        <Button onClick={onBtnClick} color="primary">Join Session</Button>
        </div>
        </Grid>
        </Grid>
      </header>
    </div>
  );
}

function onBtnClick2(e){
  e.preventDefault();
  console.log('Should create new session but this is not happening yet')
}

function onBtnClick(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const room = document.getElementById("room").value;

  socket.emit('join', { name, room }, () => {
    console.log(`user joined room ${room} as ${name}`);
  });
}

export default App;
