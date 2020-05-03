import React from 'react';
import { Button, TextField, Typography, Grid, Container, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';


class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: "",
            sessionIdError: false
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleSessionIdChange = this.handleSessionIdChange.bind(this);
        this.handleStartNewSession = this.handleStartNewSession.bind(this);
        this.handleJoinExistingSession = this.handleJoinExistingSession.bind(this);
    }

    render() {
        return (
            <Container fixed className='mainHomeContainer'>
                <Grid container spacing={1} justify='center'>
                    <Grid item lg={5} xs={12}>
                        <Paper variant="outlined">
                            <Typography variant="h5" component="h2" align="center">Planning Poker</Typography>

                            <Grid item xs={12} className="gridRow">
                                <Typography variant="body1" component="span">Start New Session</Typography>
                                <Button variant="contained" onClick={this.handleStartNewSession} color="primary" className="startBtn">Start</Button>
                            </Grid>

                            <Grid item xs={12} className="gridRow">
                                <div>
                                    <Typography variant="body1" component="span">Join Existing Session</Typography>
                                    <TextField id="roomInput" label="Session Id" variant="outlined" required className="sessionInput"
                                        error={this.state.sessionIdError}
                                        onChange={this.handleSessionIdChange}
                                        value={this.state.sessionId} />
                                    <Button variant="contained" onClick={this.handleJoinExistingSession} color="primary" className="startBtn">Join</Button>
                                </div>
                            </Grid>
                        </Paper>
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

    handleJoinExistingSession() {
        if (!this.state.sessionId) {
            this.setState({ sessionIdError: true });
        }
        else {
            this.props.history.push('/pokerSession/' + this.state.sessionId);
        }
    }

    handleSessionIdChange(e) {
        if (e.target.value) {
            this.setState({ sessionIdError: false });
        }
        this.setState({ sessionId: e.target.value });
    }
    handleStartNewSession() {
        this.props.history.push('/pokerSession/' + uuidv4());
    }
}


const mapStateToProps = (state, dispatch) => ({
    poker: state.poker
});

export default connect(mapStateToProps)(HomeComponent);