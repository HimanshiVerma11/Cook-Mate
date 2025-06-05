import React, {useEffect} from 'react'
import './loader.css';



export default function Loader() {


  return (
    <div className='loader'>
        <div className='message'>
            <h4><span>Listening</span> and preparing your steps...</h4>
        </div>
        <div className='animation'>
           <img src='/assets/LottieLoader.gif' alt='Loader'></img>
        </div>
    </div>
  )
}
