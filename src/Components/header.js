import React,{Children, useState} from 'react'
import './header.css';
import Input from './input.js';
import Loader from  './loader.js' ;
import Output from  './output2.js' ;




export default function Header() {

   var [screen, setScreen] = useState('input');
   var [inputValue, setInputValue] = useState("");
   

  return (
    <div className='box'>
      <div className='heading'>
        <div className='title'>
          <p>Cook Mate</p>
        </div>
        <div className='sub-title'>
          <h3>Your friendly  step-by-step cooking buddy</h3>
        </div>

      </div>
       {screen === 'input' && (
          <Input setScreen={setScreen} setInputValue={setInputValue}></Input>
      )}
      {screen === 'loader' && (
          <Loader></Loader>
      )}
       {screen === 'output' && (
          <Output InputValue={inputValue} ></Output>
      )}
    </div>
  )
}
