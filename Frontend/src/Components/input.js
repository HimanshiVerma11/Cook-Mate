import React,{useState} from 'react'
import axios from 'axios';
import './input.css';

export default function Input({setScreen,setInputValue}) {

    const [url, setUrl] = useState("");

    


    const handleSubmit = async (event) => {
    event.preventDefault(); 
    setScreen('loader');
     try {
      const response = await axios.post("http://127.0.0.1:8000/main", {
        url: url,
      });
      if(response.data){
        const cleanedSteps = response.data
        .map(step => step.trim())
        .filter(step => step !== '');
        console.log(cleanedSteps)
        setInputValue(cleanedSteps);
        setScreen('output');
      }
    } catch (err) {
      console.error("Error sending URL:", err);
    }
  };


 



  return (
    <div className='input-box'>
        <form onSubmit={handleSubmit}>
        <div  className='input'>
            <div className='input-msg'>
                <h4>Insert YouTube recipe link here.......!</h4>
            </div>
            
            <div className='input-text'>
                <input type='text' value={url} onChange={(e) =>setUrl(e.target.value)}></input>
            </div>
            <div className='submit'>
                <button type="submit">GUIDE ME!</button>
            </div>
            
        </div>
        </form>
    </div>

    
  )
}
