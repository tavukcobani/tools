import React from 'react';
import { Button, TextField, Typography, Grid, Container, Box, Tooltip } from '@material-ui/core';
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
                        <Box variant="outlined" boxShadow={3} style={{ padding: 4 }}>
                            <Typography variant="h5" component="h2" align="center">Planning Poker</Typography>
                            <Grid item xs={12} className="gridRow">
                                <Typography variant="body1" component="span">Start New Session</Typography>
                                <Tooltip title="Start a new session" aria-label="Start a new session">
                                    <Button size="small" variant="contained" onClick={this.handleStartNewSession} color="primary" className="startBtn">Start</Button>
                                </Tooltip>
                            </Grid>

                            <Grid item xs={12} className="gridRow">
                                <div>
                                    <Typography variant="body1" component="span">Join Existing Session</Typography>
                                    <TextField id="roomInput" label="Session Id" variant="outlined" required className="sessionInput"
                                        error={this.state.sessionIdError}
                                        onChange={this.handleSessionIdChange}
                                        value={this.state.sessionId} />
                                    <Tooltip title="Join session by id" aria-label="Join session by id">
                                        <Button size="small" variant="contained" onClick={this.handleJoinExistingSession} color="primary" className="startBtn">Join</Button>
                                    </Tooltip>
                                </div>
                            </Grid>
                        </Box>
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