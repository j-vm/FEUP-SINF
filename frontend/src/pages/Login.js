import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Media } from "reactstrap";
import { Redirect } from "react-router-dom";
import { useAuth } from "../auth";
import { Layout } from "../components/Layout";
import ReactLogo from "../besinflogo.png";
import { Link } from "react-router-dom";

const AuthButton = (props) => {
  const { onSubmit } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (e, setState) => {
    const { value } = e.target;
    setState(value);
  };
  return (
    <div className="mx-auto">
      <div className="text-center">
        <Link to="/about">
          <Media middle href="#">
            <Media object src={ReactLogo} height="400" alt="logo" />
          </Media>
        </Link>
      </div>
      <div className="card-body d-flex justify-content-center">
        <Form
          className="w-50"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(userName, password);
          }}
        >
          Sign in
          <FormGroup className="mt-2">
            <Label for="username" hidden>
              Email
            </Label>
            <Input
              type="username"
              name="userName"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => handleChange(e, setUserName)}
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
              placeholder="Password"
              value={password}
              onChange={(e) => handleChange(e, setPassword)}
            />
          </FormGroup>{" "}
          <div className="text-center">
            <Button type="submit" color="success">
              Log In
            </Button>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
};

export const Login = () => {
  const auth = useAuth();

  const onSubmit = (userName, password) => {
    auth.signin(userName, password);
  };

  return auth && auth.token !== "" ? (
    <Redirect to="/app"></Redirect>
  ) : (
      <Layout>
        <AuthButton onSubmit={onSubmit}></AuthButton>
      </Layout>
    );
};
