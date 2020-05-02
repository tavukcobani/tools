import React from 'react';
import { Button, TextField, Typography, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import client from "socket.io-client";
let socket = client("localhost:4000");

class PokerSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: this.props.match.params.sessionId,
            userName: '',
            userNameError: false,
            userJoined: false,
            role: 'Admin',
            userId: '',
            sessionName: '',
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleJoinSession = this.handleJoinSession.bind(this);
        this.setSessionName = this.setSessionName.bind(this);
        this.handleSessionNameChange = this.handleSessionNameChange.bind(this);
        this.vote = this.handleVote.bind(this);
    }
    componentDidMount() {
        socket.on('message', (message) => {
            this.props.serverMessageReceived(message)
            // console.log(`message from server`, message);
        });
    }

    handleUserNameChange(e) {
        if (e.target.value) {
            this.setState({ userNameError: false });
        }
        this.setState({ userName: e.target.value });
    }
    handleSessionNameChange(e) {
        this.setState({ sessionName: e.target.value });
    }

    setSessionName() {
        socket.emit('setRoomName', { name: this.state.sessionName, roomId: this.state.sessionId, }, () => { });
    }

    handleJoinSession(role) {
        if (!this.state.userName) {
            this.setState({ userNameError: true });
        }
        else {
            socket.emit('join', { name: this.state.userName, roomId: this.state.sessionId, role: role }, (resp) => {
                this.setState({ userJoined: true, userId: resp.userId });
            });
        }
    }
    handleVote(voteValue) {
        socket.emit('setVote', { userId: this.state.userId, roomId: this.state.sessionId, vote: voteValue }, () => {
            this.setState({ userJoined: true });
        });
    }

    render() {
        const fibonacci = ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?'];
        let users = this.props.room.users || [];
        const usersDisplay = users.map((usr) => {

            return (<div key={usr.id}>
                {usr.name}: {usr.vote}
            </div>)
        });
        let votingButtons = '';
        if (this.state.userJoined) {
            let votingButtonsArray = [];
            fibonacci.forEach((element, index) => {
                votingButtonsArray.push(<Button variant="contained" size="small" color="primary" key={'vote_btn_' + index} onClick={() => this.handleVote(element)} className="votingButton">{element}</Button>);
            });
            votingButtons = (
                <div className='votingContainer'>
                    <div className='votingDiv'>
                        {votingButtonsArray}
                    </div>
                </div>);
        }
        return (
            <div className='container'>

                <div>
                    <Typography variant="body1" component="span"></Typography>
                    {!this.state.userJoined &&
                        <div>
                            <TextField id="userName" label="User Name" variant="outlined" required className="sessionInput"
                                error={this.state.userNameError}
                                onChange={this.handleUserNameChange}
                                value={this.state.userName} />
                            <Button variant="contained" onClick={() => this.handleJoinSession('player')} color="primary" className="startBtn">Player</Button>
                            <Button variant="contained" onClick={() => this.handleJoinSession('observer')} color="primary" className="startBtn">Observer</Button>
                        </div>
                    }
                    {this.state.userJoined &&
                        <div>
                            {/* TODO ADD display for session name if session name is set */}
                            <TextField id="roomName" label="Session Name" variant="outlined" required className="sessionInput"
                                onChange={this.handleSessionNameChange}
                            />
                            <Button variant="contained" onClick={() => this.setSessionName()} color="primary" className="startBtn">Set</Button>
                            <Typography>{this.props.room.name}</Typography>
                            <div>
                            </div>
                        </div>
                    }

                </div>
                <div>
                    <div>{usersDisplay}</div>
                </div>
                {votingButtons}



            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    serverMessageReceived: message => {
        dispatch({ type: 'SERVER_UPDATE', payload: message });
    },
});

const mapStateToProps = state => ({
    room: state.poker.room || {}
});


export default connect(mapStateToProps, mapDispatchToProps)(PokerSession);