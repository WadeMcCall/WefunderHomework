import * as React from "react";
import axios from 'axios'

export type FileInputProps = {
    AcceptedFileTypes: string[];
}

const FileInputForm: React.FC<{props: FileInputProps}> = ({props}) => {
  let selectedFile = React.useRef<File | null>(null);

  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectedFile.current = e.target.files[0];
    var formData = new FormData();
    formData.append("theFile", selectedFile.current);
    axios.post('http://localhost:3000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      // If success redirect to the pitch deck page
      console.log(response);
      if(response.status == 200) {
        window.location.href = "http://localhost:3000/pitchDeck"
      } 
    })
  }

  return (
      <form action="/api/upload" method="post" id="formUpload">
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label"></label>
          <input 
            type="file"
            className="form-control" 
            id="formFile"
            accept={props.AcceptedFileTypes.join(', ')}
            onChange={fileSelectedHandler}
          >
          </input>
        </div>
      </form>
  );
}

export default FileInputForm;