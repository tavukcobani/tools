import React from 'react';
import { Button, TextField, Typography, Table, TableContainer, TableBody, TableCell, TableRow } from '@material-ui/core';
import { connect } from 'react-redux';
import client from "socket.io-client";
import PlayersTable from './PlayersTable';
import BlowCannon from './ConfettiCannon';

let socket;

if (process.env.NODE_ENV === 'development') {
    socket = client("localhost:4000");
}
else {
    socket = client("backend.agilesofthub.com");
}

class PokerSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: this.props.match.params.sessionId,
            userName: '',
            userNameError: false,
            userJoined: false,
            userRole: '',
            userId: '',
            sessionName: '',
            votesReady: false
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleJoinSession = this.handleJoinSession.bind(this);
        this.setSessionName = this.setSessionName.bind(this);
        this.handleSessionNameChange = this.handleSessionNameChange.bind(this);
        this.vote = this.handleVote.bind(this);
        this.clearVotes = this.clearVotes.bind(this);
    }
    componentDidMount() {
        socket.on('message', (message) => {
            this.props.serverMessageReceived(message)
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
                this.setState({ userJoined: true, userId: resp.userId, userRole: role });
            });
        }
    }

    handleVote(voteValue) {
        socket.emit('setVote', { userId: this.state.userId, roomId: this.state.sessionId, vote: voteValue }, () => {
            this.setState({ userJoined: true });
        });
    }
    clearVotes() {
        socket.emit('clearVotes', { roomId: this.state.sessionId }, () => {
        });
    }

    componentDidUpdate(prevProps, prevState) {
        let users = this.props.room.users || [];
        let players = users.filter((usr) => usr.role === 'player');
        if (this.state.votesReady && !(players.length > 0 && !players.some(p => !p.vote))) {
            this.setState({ votesReady: false })
        } else if (!this.state.votesReady && (players.length > 0 && !players.some(p => !p.vote))) {
            this.setState({ votesReady: true })
        } else {
            let isConsensus = players.every(p => p.vote === players[0].vote && players[0].vote);
            // At this point, blow the confetti cannon
            if (this.state.votesReady && (this.state.votesReady !== prevState.votesReady) && isConsensus && players.length > 1) {
                const canvas = this.refs.canvas;
                BlowCannon(canvas);
            }
        }
    }

    render() {
        const fibonacci = ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?'];
        let users = this.props.room.users || [];
        let observers = users.filter((usr) => usr.role === 'observer');
        let observersTable = '';
        if (observers.length > 0) {
            observersTable = (
                <div>
                    <Typography variant='h6'> Observers ({observers.length})</Typography>
                    <TableContainer >
                        <Table aria-label="Observers Table" size="small" style={{ display: 'initial' }}>
                            <TableBody>
                                {observers.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            );
        }


        let votingButtons = '';
        if (this.state.userJoined && this.state.userRole === 'player') {
            let votingButtonsArray = [];
            fibonacci.forEach((element, index) => {
                votingButtonsArray.push(<Button variant="contained" size="small" color="primary" key={'vote_btn_' + index} onClick={() => this.handleVote(element)} className="votingButton" disabled={this.state.votesReady}>{element}</Button>);
            });
            votingButtons = (

                <div className='votingDiv'>
                    {votingButtonsArray}
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
                            <Button variant="contained" size="small" onClick={() => this.handleJoinSession('player')} color="primary" className="startBtn">Player</Button>
                            <Button variant="contained" size="small" onClick={() => this.handleJoinSession('observer')} color="primary" className="startBtn">Observer</Button>
                        </div>
                    }
                    {this.state.userJoined && <Typography variant='h5'>Estimating: {this.props.room.name}</Typography>}

                </div>
                <PlayersTable userId={this.state.userId}></PlayersTable>
                {observersTable}
                <div className='votingControl'>
                    {this.state.userJoined &&
                        <Button onClick={() => this.clearVotes()} variant="contained" size="small" color="secondary" className='clearVotesButton'>Clear Votes</Button>
                    }
                </div>
                <div className='votingContainer'>
                    {votingButtons}
                </div>
                {this.state.userJoined &&
                    <div style={{ margin: 24 }}>
                        <TextField id="roomNameInput" label="Session Name" variant="outlined" required className="sessionInput"
                            onChange={this.handleSessionNameChange} />
                        <Button variant="contained" onClick={() => this.setSessionName()} color="primary" className="startBtn">Set</Button>
                        <div>
                        </div>
                    </div>
                }
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