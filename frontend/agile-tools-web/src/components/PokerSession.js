import React from 'react';
import { Button, TextField, Typography, Grid, Card, Container } from '@material-ui/core';
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
            role: 'Admin'
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleJoinSession = this.handleJoinSession.bind(this);
        this.handleObserverJoinSession = this.handleObserverJoinSession.bind(this);
    }
    componentDidMount() {
        socket.on('message', (message) => {
            this.props.serverMessageReceived(message)
            console.log(`message from server`, message);
        });
    }

    handleUserNameChange(e) {
        if (e.target.value) {
            this.setState({ userNameError: false });
        }
        this.setState({ userName: e.target.value });
    }

    handleObserverJoinSession() {
        if (!this.state.userName) {
            this.setState({ userNameError: true });
        }
        else { 
            socket.emit('join', { name: this.state.userName, roomId: this.state.sessionId, role: 'observer' }, () => {
                this.setState({ userJoined: true });
            });
        }
    }
    handleJoinSession() {
        if (!this.state.userName) {
            this.setState({ userNameError: true });
        }
        else {

            socket.emit('join', { name: this.state.userName, roomId: this.state.sessionId, role: 'player' }, () => {
                this.setState({ userJoined: true });
            });
        }
    }

    render() {
        let users = this.props.room.users || [];
        const usersDisplay = users.map((usr) => {
            return (<div key={usr.id}>
                {usr.name}
            </div>)
        });
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
                            <Button variant="contained" onClick={this.handleJoinSession} color="primary" className="startBtn">Player</Button>
                            <Button variant="contained" onClick={this.handleObserverJoinSession} color="primary" className="startBtn">Observer</Button>
                        </div>
                    }
                </div>
                <div>
                    <div>{usersDisplay}</div>
                </div>

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