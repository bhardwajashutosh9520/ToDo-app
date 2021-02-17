import React from 'react';
import './App.css';

function Button(props) {
  return (
    <div style={{color :"red"}}>
      {props.color}
    </div>
  )
}

export default Button;
