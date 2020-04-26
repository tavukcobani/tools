import React from 'react';
import { Button, TextField, Typography, Grid, Container } from '@material-ui/core';
import client from "socket.io-client";
let socket = client("localhost:4000");

export default class PokerSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: this.props.match.params.sessionId,
            userName: '',
            userNameError: false,
            role: 'Admin'
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleJoinSession= this.handleJoinSession.bind(this);
    }
    componentDidMount() {
        socket.on('message', (message) => {
            console.log(`message from server`, message);
        });
    }

    handleUserNameChange(e) {
        if (e.target.value) {
            this.setState({ userNameError: false });
        }
        this.setState({ userName: e.target.value });
    }

    handleJoinSession(){
        socket.emit('join', { name: this.state.userName, room: this.state.sessionId }, () => {
                    console.log(`user joined room ${this.state.sessionId} as ${this.state.userName}`);
                });

      //  console.log('sessionId: '+  this.state.sessionId + 'user Name: '+this.state.userName )
    }

    render() {
        return (<Container>
           
            <Grid item xs={12} className="gridRow">
                <div>
                    <Typography variant="body1" component="span"></Typography>
                    <TextField id="userName" label="User Name" variant="outlined" required className="sessionInput"
                        error={this.state.userNameError}
                        onChange={this.handleUserNameChange}
                        value={this.state.userName} />
                    <Button variant="contained" onClick={this.handleJoinSession} color="primary" className="startBtn">Join</Button>
                </div>
            </Grid>
        </Container>)
    }
}