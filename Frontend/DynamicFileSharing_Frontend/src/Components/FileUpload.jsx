import React, { useState } from 'react'

function FileUpload({handleSubmit}) {
    const [files, setFiles] = useState(null);
    
    function handleChange(e){
        setFiles(e.target.files[0]);
    }
    
    function handleSubmission(e){
      e.preventDefault();
      if(files){
        handleSubmit(files);
        setFiles(null);
      }
    }
  return (
    <div>
      <h2>Upload Files</h2>
      <form onSubmit={handleSubmission} encType='multipart/form-data'>
        <input type="file" name="file" onChange={handleChange} />
        <button type='submit'>Upload</button>
      </form>
    </div>
  )
}

export default FileUpload
