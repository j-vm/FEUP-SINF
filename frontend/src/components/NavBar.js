import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { useAuth } from "../auth";
import ReactLogo from "../squares.png";
import Sinf from "../besinf.png";

export const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const auth = useAuth();

  return (
    <div>
      <Navbar color="dark" light expand="md">
        <Link className="text-info navbar-brand" to="/About/">
          <img
            alt=""
            src={ReactLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <span className="mx-2">
            <img
              alt=""
              src={Sinf}
              width="150"
              className="d-inline-block align-top"
            />
          </span>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/app/info/" className="text-muted nav-link">
                Settings
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/app/processes/" className="text-muted nav-link">
                Processes
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/app/sync/" className="text-muted nav-link">
                Data
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/app/logs/" className="text-muted nav-link">
                Logs
              </Link>
            </NavItem>
          </Nav>
          <Nav>
            <NavItem>
              <Button onClick={auth.signout}>Log Out</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
