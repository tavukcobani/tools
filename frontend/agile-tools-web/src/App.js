import React from 'react';
import client from "socket.io-client";
import logo from './logo.svg';
import './App.css';

let socket = client("localhost:3000");

socket.on('message', (message) => {
  console.log(`message from server: ${message.text}`);
});

function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Agile Tools 
        </p>
        <input id="name" ></input>
        <input id="room" ></input>
        <button onClick={onBtnClick}>Join</button>
      </header>
    </div>
  );
}

function onBtnClick(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const room = document.getElementById("room").value;


  socket.emit('join', {name, room}, () => {

  });
}

export default App;
