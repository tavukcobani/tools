import React, { Component } from 'react';
import styles from './card.css';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import { ButtonBase } from '@material-ui/core';

class Card extends Component {
  constructor(props){
      super(props);
  }  
  render() {
    const suitMap = {
      'S': 'Spades',
      'H': 'Hearts',
      'C': 'Clubs',
      'D': 'Diamonds'
    };
    const rankMap = {
      '0': 'Zero',
      '1/2':'Half',
      '1': 'One',
      '2': 'Deuce',
      '3': 'Three',
      '5': 'Five',
      '8': 'Eight',
      '13': 'Thirteen',
      '20': 'Twenty',
      '40': 'Forty',
      '100': 'Hundred',
      '?': 'Question',
      'Yes': 'Agree',
      'No': 'Disagree'
    };

    return (
      <div className="wrapper">
         {/* <ButtonBase className='cardButtonBase'> */}
        <div className={'card '+ (this.props.isDisabled? 'disabledCard':'') } >
          {/* <div className={`${this.props.suit} mark dark`}>{this.props.rank}</div> */}
          <div className="content" >
            <h1>{this.props.rank}</h1>
            {/* <h2><sup>OF</sup><span className="dark">{suitMap[this.props.suit]}</span></h2> */}
          </div>
          {/* <div className={`${this.props.suit} mark upside-down`}>{this.props.rank}</div>
      */}
        </div>
        {/* </ButtonBase> */}
      </div>
    );
  }
}

export default Card;