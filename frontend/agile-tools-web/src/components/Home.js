import React from 'react';
import { Button, TextField, Typography, Grid, Card, Container } from '@material-ui/core';
import { connect } from 'react-redux';

import client from "socket.io-client";
let socket = client("localhost:4000");

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     newUserName: null,
        //     newUserNameError: false,
        //     sessionId: null,
        // };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleSessionIdChange = this.handleSessionIdChange.bind(this);
        this.handleStartNewSession = this.handleStartNewSession.bind(this);
        this.handleJoinExistingSession = this.handleJoinExistingSession.bind(this);
    }
    pro = 'a';
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
                                <Typography variant="body1" component="span">Start New Session</Typography>
                                {/* <TextField id="new_usr_name" name="name" label="User Name" variant="outlined" className="customInput" error={this.state.newUserNameError}
                                    onChange={(e) => this.handleUserNameChange(e)} value={this.state.newUserName || ''} required /> */}
                                <Button variant="contained" onClick={this.handleStartNewSession} color="primary" className="startBtn">Start</Button>
                            </Grid>

                            <Grid item xs={12} className="gridRow">
                                <div>
                                    <Typography variant="body1" component="span">Join Existing Session</Typography>
                                    {/* <TextField id="name" name="name" label="User Name" variant="outlined" required /> */}
                                    <TextField id="room" label="Session Id" variant="outlined" required className="sessionInput" value={this.props.pro} />
                                    <Button variant="contained" onClick={this.handleJoinExistingSession} color="primary" className="startBtn">Join</Button>
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

    handleJoinExistingSession(){
        console.log('this.props.pro', this.props.pro);
        console.log('handleStartNewSession called')
    }
    handleSessionIdChange(){

    }
    handleStartNewSession() {
        // if (this.state.newUserName === '' || !this.state.newUserName || this.state.newUserName.trim() === '') {
        //     this.setState({ newUserNameError: true });
        // }
        // else {
        //     socket.emit('newSession', { name: this.state.newUserName }, () => {
        //         console.log(`User Created and joined session`);
        //     });
        // }

        console.log('handleStartNewSession called')
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
const mapStateToProps = state => ({
    poker: state.poker
});

export default connect(mapStateToProps)(HomeComponent);

//export default ;