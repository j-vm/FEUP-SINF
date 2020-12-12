import React, { useState } from "react";
import { Table, Button, Row, Col, FormGroup, InputGroup, InputGroupAddon, Label,Input } from "reactstrap";
import { useAuth } from "../../auth";

async function getProcesses(token) {
  const response = await fetch(`/api/processes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

async function addProcess(token, process_name) {
  const response = await fetch(`/api/processes/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({process_name}),
  });
  return await response.json();
}

async function getData(token) {
  const data = Promise.all([getProcesses(token)]);
  return await data;
}

function ProcessTable({ processes }) {
  return (
    <Row>
      <Col sm="12">
        <InputGroup>
          <Input type="text" name="process_name" id="process_name" placeholder="Insert a new process" />
          <InputGroupAddon addonType="append"><Button onClick={addProcess} color="info" >Add New Process</Button>{" "}</InputGroupAddon>
        </InputGroup>
      </Col>
      <Col sm="12" className="mt-5">
        <Table dark style={{ textAlign: "center" }}>
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
                  <tr>
                    <td className="text-center align-middle">{id}</td>
                    <td className="text-center align-middle">{name}</td>
                    <td className="text-center align-middle">{numberSteps}</td>

                    <td className="text-center align-middle">
                      <Button color="danger">Delete</Button>
                    </td>
                    <td className="text-center align-middle">
                      <Button color="primary">Edit</Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export const Processes = () => {
  const [data, setData] = useState(null);
  const { token } = useAuth();

  if (data === null) getData(token).then(setData);
  console.log(data);
  return data !== null ? (
    <ProcessTable processes={data[0]} />
  ) : (
    <p> Loading ...</p>
  );
};
