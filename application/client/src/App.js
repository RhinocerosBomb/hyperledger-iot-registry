import React, { useState  } from "react";
import "./App.css";
import Particles from "./Particles";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Popup from "./Popup";

import Box from "@material-ui/core/Box";
import zIndex from "@material-ui/core/styles/zIndex";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function App() {
  const classes = useStyles();

  const [id, setId] = useState("");
  const [controllerId, setControllerId] = useState("");

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
  const styles = {
    root: {
      fontFamily: "sans-serif",
      textAlign: "center",
      height: "100%",
      background: "#111",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      zIndex: "-1"
    }
  };
  return (
    <div>
      <div style={styles.root}>
        <Particles />
      </div>

      <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
        <h1 align="middle">Hyperledger IoT Registry </h1>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead
            style={{
              fontSize: "1rem",
              padding: "10rem",
              backgroundColor: "rgba(0,0,0,0.2)"
            }}
          >
            <TableRow
              style={{
                fontSize: "5rem",
                padding: "5rem",
                backgroundColor: "rgba(64, 64, 64, 1)"
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell align="right">Controller ID</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Condition</TableCell>
              <TableCell align="right">Confirm</TableCell>
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
                  name="Controller Id"
                  type="text"
                />
              </TableCell>
              <TableCell align="right">
                <select
                  value={active}
                  onChange={event => setActive(event.target.value)}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
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
                  ID : {device.id}
                </TableCell>
                <TableCell align="right">
                  Controller: {device.controllerId}
                </TableCell>
                <TableCell align="right">State: {device.active}</TableCell>
                <TableCell align="right">
                  Condition: {device.condition}
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
        <label>
          Change Controller ID for: {editId}:
          <input
            value={editControllerId}
            onChange={event => setEditControllerId(event.target.value)}
            name="editId"
            type="text"
          />
        </label>

        <br />
        <button onClick={changeController}>Change</button>
        <button onClick={() => setShowPopup(false)}>Close</button>
      </Popup>
    </div>
  );
}

export default App;
