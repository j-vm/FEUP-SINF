import React, { useState } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
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

async function addStep(token, order, processId, type, documentType, company) {
  const response = await fetch(`/api/processes/${processId}/steps`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order,
      processId,
      type,
      documentType,
      company,
    }),
  });
  return await response.json();
}

async function getData(token, params) {
  //const process_id = queryString.parse(this.props.location.search.id)
  const data = getSteps(params.id, token);
  return await data;
}

function AddStepForm({ onAdd }) {
  const [docType, setDocType] = useState("");
  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  return (
    <Form>
      <h2>Add New Step to Process</h2>
      <Row className="mt-3">
        <Col>
          <Label for="docType" className="font-weight-bold">
            Document Type
          </Label>
          <Input
            type="select"
            name="docType"
            value={docType}
            onChange={(e) => {
              const { value } = e.target;
              setDocType(value);
            }}
          >
            <option value="">Select process</option>
            <option value="buyOrder">Buy Order</option>
            <option value="sellOrder">Sell Order</option>
            <option value="deliveryNote">Delivery Note</option>
            <option value="orderReceipt">Order Receipt</option>
            <option value="invoice">Invoice</option>
            <option value="invoiceReceipt">Supplier Invoice</option>
            <option value="payment">Proof of Payment</option>
            <option value="receipt">Payment Receipt</option>
          </Input>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label for="type" className="font-weight-bold">
            Step Type
          </Label>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="type"
                value="wait"
                onChange={(e) => {
                  const { value } = e.target;
                  setType(value);
                }}
              />{" "}
              Detect
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="type"
                value="emit"
                onChange={(e) => {
                  const { value } = e.target;
                  setType(value);
                }}
              />{" "}
              Publish
            </Label>
          </FormGroup>
        </Col>
        <Col>
          <Label for="company" className="font-weight-bold">
            Company
          </Label>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="company"
                value="1"
                onChange={(e) => {
                  const { value } = e.target;
                  setCompany(value);
                }}
              />{" "}
              Company 1
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="company"
                value="2"
                onChange={(e) => {
                  const { value } = e.target;
                  setCompany(value);
                }}
              />{" "}
              Company 2
            </Label>
          </FormGroup>
        </Col>
        <Col className="text-right">
          <Button
            onClick={() => {
              onAdd(type, docType, company, () => {
                setDocType("");
                setType("");
                setCompany("");
              });
            }}
            color="primary"
          >
            Add New Step
          </Button>{" "}
        </Col>
      </Row>
    </Form>
  );
}

function StepsTable({ steps }) {
  return (
    <Table dark striped style={{ textAlign: "center" }}>
      <thead>
        <tr>
          <th>Order</th>
          <th>Company</th>
          <th>Type</th>
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
            const { order, company, type, docType } = step;
            return (
              <tr key={order}>
                <td className="text-center align-middle">{order}</td>
                <td className="text-center align-middle">{company}</td>
                <td className="text-center align-middle">{type}</td>
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

  const onAdd = async (type, documentType, company, setDone) => {
    const result = await addStep(
      token,
      data.length,
      params.id,
      type,
      documentType,
      company
    );
    const newStep = [...data, result];
    setData(newStep);
    setDone();
  };

  return data !== null ? (
    <>
      <Row>
        <Col sm="12">
          <AddStepForm onAdd={onAdd}></AddStepForm>
        </Col>
        <Col sm="12" className="mt-5">
          <h2>Steps Listing</h2>
          <StepsTable steps={data} />
          <Button color="primary" onClick={() => history.goBack()}>
            Go back
          </Button>
        </Col>
      </Row>
    </>
  ) : (
    <p> Loading ...</p>
  );
};
