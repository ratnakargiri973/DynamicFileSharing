import React, { useEffect, useState } from 'react'
import './App.css'
import FileUpload from './Components/FileUpload.jsx'
import ListFiles from './Components/ListFiles.jsx';
import SendEmailForm from './Components/sendEmailForm.jsx';
import axios from 'axios';

function App() {
  const [savedFiles, setSavedFiles] = useState(null);

  useEffect(()=>{
    fetchFiles();
  }, [])

  async function fetchFiles(){
    try {
      const response = await axios.get("http://localhost:8080/api");
      // console.log(response.data);
      setSavedFiles(response.data);
    } catch (error) {
      console.log(error);
      
    }
  }

  async function handleSubmit(file) {
    try {
      const data = new FormData();
      data.append("file", file);

      const response = await axios.post("http://localhost:8080/api/uploadFiles", data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div>
         <h1>Dynamic File Sharing Application</h1>
         <FileUpload handleSubmit={handleSubmit}/>
         {savedFiles && <ListFiles savedFiles={savedFiles}/>}
         <SendEmailForm />
    </div>
  )
}

export default App
