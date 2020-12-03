import React from "react";
import { Jumbotron, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

export const Home = () => {
  return (
    <Layout>
      <div className="mt-5">
        <Jumbotron fluid>
          <Container
            className="text-info"
            fluid
            style={{ textAlign: "center" }}
          >
            <h1 className="display-3">Welcome to InterCompany!</h1>
          </Container>
        </Jumbotron>
        <Link to="/login" className="btn btn-primary">
          Log In
        </Link>
      </div>
    </Layout>
  );
};
