import React, { useState } from "react";
import { Table, Button, Row, Col} from "reactstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../auth";

async function getSteps(id, token) {
    const response = await fetch(`/api/processes/${id}/steps`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}

async function getData(token, params) {
  //const process_id = queryString.parse(this.props.location.search.id)
    const data = getSteps(params.id, token);
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
                    <tr key={id}>
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

export const Steps = (props) => {
    const params = props.match.params;
    const [data, setData] = useState(null);
    const { token } = useAuth();

    let history = useHistory();

    if (data === null) getData(token, params).then(setData);

    return data !== null ? (
    <>
        <Row>
            <Col sm="12">
                <StepsTable steps={data} />
                <Button color="primary" onClick={() => history.goBack()}>Go back</Button>
            </Col>
        </Row>
    </>
    ) : (
        <p> Loading ...</p>
    );
};
