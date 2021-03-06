import React from "react";
import { Layout } from "../components/Layout";
import ReactLogo from "../besinflogo.png";
import { Media } from "reactstrap";
import { Link } from "react-router-dom";
import feup from "../feup.png";

export const About = () => {
  return (
    <Layout>
      <div className="row">
        <div className="col-12 text-center">
          <Media middle href="#">
            <Media object src={ReactLogo} height="400" alt="logo" />
          </Media>
        </div>
      </div>
      <div className="row mt-5 text-justify">
        <div className="col-12 mt-5 text-justify">
          <p>
            <strong>BESINF</strong> is based on a fundamental pillar:{" "}
            <strong>garantee our customer's comfort</strong>. We provide a a
            service that automates the business interaction between companies
            and integrates with <strong>PRIMAVERA&#39;s ERP software</strong>.
          </p>
          <p>
            The <strong>main aim of BESINF</strong> is to develop an interface
            that allows companies to{" "}
            <strong>define a set of reactive processes</strong> that are
            integrated with the <strong>Jasmin platform</strong>: that is,
            processes that are executed in response to specific user-driven
            events, such as an invoice being generated or new stock being
            registered, and admit the concept of continuations, which define a
            sequence of trigger-process-stop steps within a single automated
            process.
          </p>
          <p>
            <strong>BESINF</strong> uses <strong>Jasmin</strong> to deal with
            all the data and processes surrounding transactions, inventory and
            information about each product.{" "}
          </p>
          <p>
            This WebApp was developed within the course project for Information
            Systems (SINF - EIC0040) of the Integrated Masters in Informatics
            and Computing Engineering (MIEIC) at the Faculty of Engineering of
            the University of Porto (FEUP), supervised by Professor Luís Barros.
          </p>{" "}
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-9">
          <h5 className="font-weight-bold">Group Elements:</h5>
          <ul>
            <li>Bernardo Oliveira Teixeira Santos - up201504711@fe.up.pt</li>
            <li>João Nuno Carvalho de Matos - up201705471@fe.up.pt </li>
            <li>João Ruano Neto Veiga de Macedo - up201704464@fe.up.pt</li>
            <li>Maria Marta Nunes Andrade Lobo dos Santos - up201604530@fe.up.pt</li>
            <li>Miguel Rodrigues Pires - up201406989@fe.up.pt</li>
          </ul>
        </div>
        <div className="col-3 text-right">
          <Media right href="#">
            <Media object src={feup} height="70" alt="feup" />
          </Media>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 text-center">
          <Link to="/app/info/" className="btn btn-info">
            Go Back
          </Link>
        </div>
      </div>
    </Layout>
  );
};
