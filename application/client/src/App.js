import React, { useRef } from 'react'
import './App.css'

function App() {
  const fileRef = useRef()

  const upload = () => {
    const data = new FormData();
    data.append('file', fileRef.files[0]);
    data.append('name', 'CA_CERTIFICATE');
  
    axios.post('localhost:3000/', data)
  }

  return (
    <div className="App">
      <input type="file" ref={fileRef} />
      <button onClick={upload}>upload</button>
    </div>
  )
}

export default App
