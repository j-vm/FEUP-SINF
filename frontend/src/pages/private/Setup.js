import React from "react";
import {
  Button,
  Form,
  ListGroupItem,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export const Setup = () => {
  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-6">
          <Form className="mt-5">
            <ListGroupItem color="info" style={{ textAlign: "center" }}>
              Company 1
            </ListGroupItem>
            <FormGroup className="mt-5">
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" />
            </FormGroup>
            <FormGroup>
              <Label for="tenant1">Tenant</Label>
              <Input type="text" name="tenant" id="tenant1" />
            </FormGroup>
            <FormGroup>
              <Label for="clientID">Client ID</Label>
              <Input type="text" name="clientid" id="clientID" />
            </FormGroup>
            <FormGroup>
              <Label for="clientsecret">Client Secret</Label>
              <Input type="password" name="secret" id="clientsecret" />
            </FormGroup>
          </Form>
        </div>

        <div className="col-6">
          <Form className="mt-5">
            <ListGroupItem color="info" style={{ textAlign: "center" }}>
              Company 2
            </ListGroupItem>
            <FormGroup className="mt-5">
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" />
            </FormGroup>
            <FormGroup>
              <Label for="tenant1">Tenant</Label>
              <Input type="text" name="tenant" id="tenant1" />
            </FormGroup>
            <FormGroup>
              <Label for="clientID">Client ID</Label>
              <Input type="text" name="clientid" id="clientID" />
            </FormGroup>
            <FormGroup>
              <Label for="clientsecret">Client Secret</Label>
              <Input type="password" name="secret" id="clientsecret" />
            </FormGroup>
          </Form>
        </div>
      </div>

      <span>&nbsp;&nbsp;</span>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30vh",
        }}
      >
        <Form className="w-25">
          Authenticate:
          <FormGroup className="mt-2">
            <Label for="username" hidden>
              Email
            </Label>
            <Input
              type="username"
              name="userName"
              id="username"
              placeholder="New Username"
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="examplePassword" hidden>
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="New Password"
            />
          </FormGroup>{" "}
          <Button
            onClick={(event) => (window.location.href = "/Info/")}
            color="success"
          >
            Submit
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
};
