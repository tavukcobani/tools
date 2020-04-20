import React from 'react';
import { Button, TextField, Typography, Grid, Card, Container } from '@material-ui/core';

import client from "socket.io-client";
let socket = client("localhost:4000");

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUserName: null,
            newUserNameError: false,
            sessionId: null,
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleStartNewSession = this.handleStartNewSession.bind(this);

    }
    componentDidMount() {
        socket.on('message', (message) => {
            console.log(`message from server`, message);
        });
    }

    render() {
        return (

            <Container fixed className='mainHomeContainer'>
                <Grid container spacing={1} >
                    <Grid item xs={5}>
                        <Card variant="outlined">
                            <Typography variant="h5" component="h2" align="center">Planning Poker</Typography>

                            <Grid item xs={12} className="gridRow">
                                <Typography variant="subtitle1" component="h2">Start New Session</Typography>
                                <TextField id="new_usr_name" name="name" label="User Name" variant="outlined" className="customInput" error={this.state.newUserNameError}
                                    onChange={(e) => this.handleUserNameChange(e)} value={this.state.newUserName || ''} required />
                                <Button variant="contained" onClick={this.handleStartNewSession} color="primary" className="startBtn">Start</Button>
                            </Grid>

                            <Grid item xs={12} className="gridRow">
                                <div>
                                    <Typography variant="subtitle1" component="h2">Join Existing Session</Typography>
                                    <TextField id="name" name="name" label="User Name" variant="outlined" required />
                                    <TextField id="room" label="Session Id" variant="outlined" required className="sessionInput" />
                                    <Button variant="contained" onClick={onBtnClick} color="primary" className="startBtn">Join</Button>
                                </div>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

        )
    }

    handleUserNameChange(e) {
        if (e.target.value) {
            this.setState({ newUserNameError: false });
        }
        this.setState({ newUserName: e.target.value });
    }
    handleStartNewSession() {
        if (this.state.newUserName === '' || !this.state.newUserName || this.state.newUserName.trim() === '') {
            this.setState({ newUserNameError: true });
        }
        else {
            socket.emit('newSession', { name: this.state.newUserName }, () => {
                console.log(`User Created and joined session`);
            });
        }

        console.log('should start')
    }
}


function onBtnClick(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const room = document.getElementById("room").value;

    socket.emit('join', { name, room }, () => {
        console.log(`user joined room ${room} as ${name}`);
    });
}
export default HomeComponent;