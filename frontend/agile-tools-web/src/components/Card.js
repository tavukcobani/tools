import React, { Component } from 'react';
// DON'T REMOVE ME
import styles from './card.css';

class Card extends Component {  
    render() {
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