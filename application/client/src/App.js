import React, { useRef,useState } from 'react'
import './App.css'

function App() {
  // const fileRef = useRef()

  // const upload = () => {
  //   const data = new FormData();
  //   data.append('file', fileRef.files[0]);
  //   data.append('name', 'CA_CERTIFICATE');
  
  //   axios.post('localhost:3000/', data)
  // }

  

  const [id, setId] = useState('');
  const [controller, setController] = useState('');
  const [data, setData] = useState('');

  const printValues = e => {
    e.preventDefault();
    console.log(id,controller,data);
  };

  return (

    // <div className="App">
    //   <input type="file" ref={fileRef} />
    //   <button onClick={upload}>upload</button>
    // </div>
    <form onSubmit={printValues}>
      <label>
      id:
        <input
          value={id}
          onChange={event => setId(event.target.value)}
          name="id"
          type="text"
        />
      </label>
      <br />
      <label>
      controller:
        <input
          value={controller}
          onChange={event => setController(event.target.value)}
          name="controller"
          type="text"
        />
      </label>
      <label>
      data:
        <input
          value={data}
          onChange={event => setData(event.target.value)}
          name="data"
          type="text"
        />
      </label>
      <br />
      <button>Submit</button>
    </form>

  )
}

export default App
