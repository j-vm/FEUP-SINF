import React, { useState } from "react";
import { Table, Container, Button, Row, Col, Form, InputGroup, InputGroupAddon, Label,Input } from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth";

async function getProcesses(token) {
  const response = await fetch(`/api/processes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

async function addProcess(token, name) {
  const response = await fetch(`/api/processes`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name}),
  });
  return await response.json();
}

async function getData(token) {
  const data = getProcesses(token);
  return await data;
}

function AddProcessForm({ onAdd }) {
  const [clicked, setClicked] = useState(false);
  const [process_name, setProcessName] = useState("");
  return (
    <Form>
      <h2>Add New Process</h2>
      <InputGroup>
        <Input type="text" name="process_name" value={process_name} 
          onChange={(e) => {
          const { value } = e.target;
          setProcessName(value);
        }} placeholder="Insert a new process" />
        <InputGroupAddon addonType="append">
          <Button 
            disabled={clicked || process_name === ""}
            onClick={() => {
              setClicked(true);
              onAdd(process_name, () => {
                setClicked(false);
                setProcessName("");
              });
            }}
          color="info">
            Add New Process
          </Button>{" "}
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
}

function ProcessTable({ processes }) {
  return (
        <Table dark striped style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Process Name</th>
              <th>Number of Steps</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {processes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No processes found
                </td>
              </tr>
            ) : (
              processes.map((process) => {
                const { id, name, numberSteps } = process;
                return (
                  <tr key={id}>
                    <td className="text-center align-middle">{id}</td>
                    <td className="text-center align-middle">{name}</td>
                    <td className="text-center align-middle">{numberSteps}</td>

                    <td className="text-center align-middle">
                      <Button color="danger">Delete</Button>
                    </td>
                    <td className="text-center align-middle">
                      <Link to={'/app/processes/' + id + '/steps'}>
                        <Button color="primary">View</Button>
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
  );
}

export const Processes = () => {
  const [data, setData] = useState(null);
  const { token } = useAuth();

  if (data === null) getData(token).then(setData);

  const onAdd = async (process_name, setDone) => {
    const result = await addProcess(token, process_name);
    const newProcess = [...data, result];
    setData(newProcess);
    setDone();
  };

  return data !== null ? (
    <>
      <Row>
        <Col sm="12">
          <AddProcessForm onAdd={onAdd}></AddProcessForm>
        </Col>
        <Col sm="12" className="mt-5">
          <ProcessTable processes={data} />
        </Col>
      </Row>
    </>
  ) : (
    <p> Loading ...</p>
  );
};
