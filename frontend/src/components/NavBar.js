import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import ReactLogo from '../logo.svg';

export const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
      />{' '}
       InterCompany </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="text-muted" href="/info/">Settings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-muted" href="/processes/">Processes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-muted" href="/sync/">Data</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-muted" href="/logs/">Logs</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
