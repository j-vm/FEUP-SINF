import React, { useState } from "react";
import { Table, Container, Button, Row, Col, Form, InputGroup, InputGroupAddon, Label,Input } from "reactstrap";
import { useAuth } from "../../auth";
import queryString from 'query-string'

async function getSteps(id, token) {
    const response = await fetch(`/api/processes/${id}/steps`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}

async function getData(token) {
  //const process_id = queryString.parse(this.props.location.search.id)
    const data = getSteps(0, token);
    return await data;
}

function StepsTable({ steps }) {
    return (
        <Table dark style={{ textAlign: "center" }}>
            <thead>
                <tr>
                <th>Step ID</th>
                <th>Document Type</th>
            </tr>
            </thead>
            <tbody>
            {steps.length === 0 ? (
                <tr>
                    <td colSpan="2" className="text-center">
                        No steps found
                    </td>
                </tr>
            ) : (
            steps.map((step) => {
                const { id, docType } = step;
                return (
                    <tr>
                        <td className="text-center align-middle">{id}</td>
                        <td className="text-center align-middle">{docType}</td>
                    </tr>
                    );
                })
            )}
            </tbody>
        </Table>
    );
}

export const Steps = () => {
    const [data, setData] = useState(null);
    const { token } = useAuth();

    if (data === null) getData(token).then(setData);

    return data !== null ? (
    <>
        <Row>
            <Col sm="12">
                <StepsTable steps={data} />
            </Col>
        </Row>
    </>
    ) : (
        <p> Loading ...</p>
    );
};
