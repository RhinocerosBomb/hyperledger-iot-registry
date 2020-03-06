import React, { useState } from "react";
import "./App.css";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Popup from "./Popup";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function App() {
  const classes = useStyles();

  const [id, setId] = useState("");
  const [controllerId, setControllerId] = useState("");
  const [data, setData] = useState({});

  const [active, setActive] = useState("true");

  const [condition, setCondition] = useState("Operating");

  const [iotList, setIotList] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [editId, setEditId] = useState();
  const [editControllerId, setEditControllerId] = useState();

  const printValues = e => {
    e.preventDefault();
    const time = Date.now();
    setIotList([...iotList, { id, controllerId, active, condition, time }]);
  };

  const editController = (id, controllerId) => {
    setShowPopup(true);
    setEditId(id);

    setEditControllerId(controllerId);
  };

  console.log(iotList);

  const changeController = e => {
    console.log("changeFun");
    setIotList(
      iotList.map(device => {
        if (device.id === editId) {
          return { ...device, controllerId: editControllerId };
        }

        return device;
      })
    );
  };

  return (
    <div>
      <h1>iot list</h1>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">controllerId</TableCell>
              <TableCell align="right">state</TableCell>
              <TableCell align="right">condition</TableCell>
              <TableCell align="right">button</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <input
                  value={id}
                  onChange={event => setId(event.target.value)}
                  name="id"
                  type="text"
                />
              </TableCell>
              <TableCell align="right">
                <input
                  value={controllerId}
                  onChange={event => setControllerId(event.target.value)}
                  name="controllerId"
                  type="text"
                />
              </TableCell>
              <TableCell align="right">
                <select
                  value={active}
                  onChange={event => setActive(event.target.value)}
                >
                  <option value={true}>active</option>
                  <option value={false}>inactive</option>
                </select>
              </TableCell>
              <TableCell align="right">
                <select
                  value={condition}
                  onChange={event => setCondition(event.target.value)}
                >
                  <option value="Operating">Operating</option>
                  <option value="Dead">Dead</option>
                </select>
              </TableCell>

              <TableCell align="right">
                <button onClick={printValues}>Submit</button>
              </TableCell>
            </TableRow>

            {iotList.map(device => (
              <TableRow key={device.id}>
                <TableCell component="th" scope="row">
                  id : {device.id}
                </TableCell>
                <TableCell align="right">
                  controller: {device.controllerId}
                </TableCell>
                <TableCell align="right">state: {device.active}</TableCell>
                <TableCell align="right">
                  condition: {device.condition}
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <button
                    onClick={() =>
                      editController(device.id, device.controllerId)
                    }
                  >
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popup show={showPopup}>
        <div>ChangeController</div>

        <label>
          change controller for id {editId}:
          <input
            value={editControllerId}
            onChange={event => setEditControllerId(event.target.value)}
            name="editId"
            type="text"
          />
        </label>

        <br></br>
        <button onClick={changeController}>Change</button>
        <button onClick={() => setShowPopup(false)}>Close</button>
      </Popup>
    </div>
  );
}

export default App;
