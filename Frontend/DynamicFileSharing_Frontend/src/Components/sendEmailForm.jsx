import axios from 'axios';
import React, { useState } from 'react'

function SendEmailForm() {
    const [email, setEmail] = useState("");
    const [uuid, setUUID] = useState("");

    async function handleEmailSubmit(e){
        e.preventDefault();
        try {
            const response = await axios.post("https://dynamicfilesharing.onrender.com/api/files/send", {email, uuid});
            console.log(response);
        } catch (error) {
          console.log(error)   
        }
    }
  return (
    <div>
      <h3>Send File By Email</h3>
      <form onSubmit={handleEmailSubmit}>
        <input type="email" name='Email' placeholder="Recepient's Email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" name="UUID" placeholder='File UUID' onChange={(e)=> setUUID(e.target.value)}/>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default SendEmailForm
