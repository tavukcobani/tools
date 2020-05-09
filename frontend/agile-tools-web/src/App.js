import React from 'react';

import { AppBar, IconButton, Typography, Toolbar, List, ListItem, ListItemText, Drawer, ListItemIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import HomeIcon from '@material-ui/icons/Home';
import Home from './components/Home';
import PokerSession from './components/PokerSession';
import { Route } from 'react-router';
import { Link } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drawerIsOpen: false }
    console.log("%c 👹👹  What are you looking for son? 👹👹", "background: red; color: yellow; font-size: x-large");
  }

  handleDrawerOpen = () => {
    this.setState({ drawerIsOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerIsOpen: false });
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense" className='appToolBar'>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleDrawerOpen}>
              <MenuIcon ></MenuIcon>
            </IconButton>
            <Typography variant="h6" >
              Agile Soft Hub
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer anchor='left' open={this.state.drawerIsOpen} onClose={this.handleDrawerClose}>
          <div role="presentation" onClick={this.handleDrawerClose} onKeyDown={this.handleDrawerClose} style={{width:250}} >
            <List>
            <ConnectedRouter history={this.props.history}>
              <ListItem button component={Link} to='/'>
                <ListItemIcon><HomeIcon></HomeIcon></ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
            </ConnectedRouter>
            </List>
          </div>
        </Drawer>
        <ConnectedRouter history={this.props.history}>
          <Route exact path="/" component={Home} />
          <Route path="/pokerSession/:sessionId" component={PokerSession} />
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
