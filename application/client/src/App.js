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
  const [controllerId, setControllerId] = useState('');
  const [data, setData] = useState({});

  const [active, setActive] = useState(true);

  const [condition, setCondition] = useState();
  const [time, setTime] = useState('');

  const printValues = e => {
    e.preventDefault();
    console.log(id,controllerId,data,active,condition);


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
    
      <label>
      controllerId:
        <input
          value={controllerId}
          onChange={event => setControllerId(event.target.value)}
          name="controllerId"
          type="text"
        />
      </label>
  
      <label>
      data:
        <input
          value={data}
          onChange={event => setCondition(event.target.value)}
          name="data"
          type="text"
        />
      </label>

      <div className={active ? 'active' : 'deActive'}>
      state: {active ? 'active' : 'deactive'}
      </div>

      <label>
        condition:
        <select value={condition} 
        onChange={event => setData(event.target.value)}  
      >
          <option value="grapefruit">Operating</option>
          <option value="lime">Dead</option>
        </select>
      </label>

      
    
      <button>Submit</button>
    </form>

  )
}

export default App
