import React, { useState } from "react";
import { Table, Spinner, Row, Col, Form, Label, Input, Button} from "reactstrap";
import { useAuth } from "../../auth";

async function getLogs(token) {
    const response = await fetch(`/api/processes/executions`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}

async function getProcesses(token) {
    const response = await fetch(`/api/processes`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}

async function addLog(token, processId) {
    const response = await fetch(`/api/processes/executions`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            processId,
        }),
    });
    return await response.json();
}

async function getData(token) {
    const data = Promise.all([
        getLogs(token),
        getProcesses(token),
    ]);
    
    return await data;
}

function AddLogForm({ onAdd, processes }) {
    const [processId, setProcessId] = useState("");
    return (
        <Form>
            <h2>Add New Log</h2>
            <Row className="mt-3">
                <Col sm="10">
                <Label for="processId">Process</Label>
                    <Input type="select" name="processId" value={processId} onChange={(e) => {
                        const { value } = e.target;
                        setProcessId(value);
                    }} >
                        <option value="" key={0}>Select a process</option>
                        {processes.map((process, i) => (
                            <option key={i + 1} value={process.id}>{process.name}</option>
                        ))}
                    </Input>
                </Col>
                <Col sm="2" style={{ textAlign: 'right', position: 'absolute', right: 0, bottom: 0 }}>
                    <Button
                        onClick={() => {
                            onAdd(processId, () => {
                                setProcessId("");
                            });
                        }}
                    color="info">
                        Add New Step
                    </Button>{" "}
                </Col>
            </Row>
        </Form>
    );
}

function LogsTable({ logs }) {
    return (
        <Table dark style={{ textAlign: "center" }}>
            <thead>
                <tr>
                    <th>Process</th>
                    <th>id</th>
                    <th>Ongowing Step</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
            {logs.length === 0 ? (
                <tr>
                    <td colSpan="5~4" className="text-center">
                        No logs found
                    </td>
                </tr>
            ) : (
                logs.map((log) => {
                const { id, name, stepAt, done } = log;
                return (
                    <tr>
                        <td className="text-center align-middle">{id}</td>
                        <td className="text-center align-middle">{name}</td>
                        <td className="text-center align-middle">{stepAt}</td>
                        <td className="text-center align-middle">{done ? "done" : <Spinner></Spinner>}</td>
                    </tr>
                );
                })
            )}
            </tbody>
        </Table>
    );
}

export const Logs = () => {
    const [data, setData] = useState(null);
    const { token } = useAuth();

    if (data === null) getData(token).then(setData);

    const onAdd = async (processId, setDone) => {
        const result = await addLog(token, processId);
        const newLog = [...data[0], result];
        setData(newLog);
        setDone();
    };

    return data !== null ? (
        <>
            <Row>
                <Col sm="12">
                    <AddLogForm onAdd={onAdd} processes={data[1]}></AddLogForm>
                </Col>
                <Col sm="12" className="mt-5">
                    <h2>Logs Listing</h2>
                    <LogsTable logs={data[0]} />
                </Col>
            </Row>
        </>
    ) : (
        <p> Loading ...</p>
    );
};
