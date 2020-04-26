import React from 'react';

import { AppBar, IconButton, Typography, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import Home from './components/Home';
import PokerSession from './components/PokerSession';
import { Route} from 'react-router';
import {ConnectedRouter} from 'connected-react-router';

function App(props) {
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
      <ConnectedRouter history={props.history}>
      <Route exact path="/" component={Home}/>
      <Route  path="/pokerSession/:sessionId" component={PokerSession}/>
      </ConnectedRouter>
    </div>
  );
}

export default App;
