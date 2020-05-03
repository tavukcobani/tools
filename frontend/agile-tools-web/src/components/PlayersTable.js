import React from 'react';
import {Table, TableContainer, TableBody, TableCell, TableRow, Paper, TableHead, Typography} from '@material-ui/core';
import { connect } from 'react-redux';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import { green } from '@material-ui/core/colors';

class PlayersTableComponent extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        let users = this.props.room.users || [];
        let players = users.filter((usr)=> usr.role==='player');
        let playersTable = '';
        if(players.length>0){
            playersTable = (
                <div style={{margin:24}}>
        <Typography variant='h6'>Players ({players.length})</Typography>
            <TableContainer >
                <Table aria-label="Players Table" size="small" style={{display:'initial' }}>
                  <TableBody>
                    {players.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>
                            {row.vote && <CheckCircleSharpIcon style={{ color: green[500] }}></CheckCircleSharpIcon>}
                            </TableCell>
                        <TableCell >{row.vote}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </div>
            );
        };

        return playersTable;
    }
}


const mapStateToProps = (state, dispatch) => ({
    room: state.poker.room || {}
});

export default connect(mapStateToProps)(PlayersTableComponent);