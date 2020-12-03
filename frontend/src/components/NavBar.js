import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { useAuth } from "../auth";
import ReactLogo from "../logo.svg";

export const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const auth = useAuth();

  return (
    <div>
      <Navbar color="dark" light expand="md">
        <NavbarBrand className="text-info" href="/">
          <img
            alt=""
            src={ReactLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          InterCompany{" "}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/app/info/">
                <NavLink className="text-muted">Settings</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/app/processes/">
                <NavLink className="text-muted">Processes</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/app/sync/">
                <NavLink className="text-muted">Data</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/app/logs/">
                <NavLink className="text-muted">Logs</NavLink>
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
