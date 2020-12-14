import React from "react";
import { Media } from "reactstrap";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import ReactLogo from "../besinflogo.png";


export const Home = () => {
  return (
    <Layout>
      <div className="mt-5">
        <div class="text-center" >
        <Media middle href="#" >
          <Media object src={ReactLogo}  height="400" alt="logo" />
        </Media>
        </div>

        <div className="mt-5" style={{ textAlign: "center" }}>
        <Link to="/login" className="btn btn-info">
          Log In
        </Link>
        </div>
      </div>
    </Layout>
  );
};
