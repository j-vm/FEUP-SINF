import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';


export const Info = () => {
  return (
	<div className="mt-5" style={{ display: "flex" }}>
      <ListGroup className="w-50">

        <ListGroupItem color="info">Company 1</ListGroupItem>
        <ListGroupItem>Name: KSede</ListGroupItem>
        <ListGroupItem>Tenant</ListGroupItem>
        <ListGroupItem>Client ID</ListGroupItem>
        <ListGroupItem>Client Secret</ListGroupItem>
      </ListGroup>

	  <span>&nbsp;&nbsp;</span>

      <ListGroup className="w-50">

        <ListGroupItem color="info">Company 2</ListGroupItem>
        <ListGroupItem>Name: BottleFlip</ListGroupItem>
        <ListGroupItem>Tenant</ListGroupItem>
        <ListGroupItem>Client ID</ListGroupItem>
        <ListGroupItem>Client Secret</ListGroupItem>
      </ListGroup>
    </div>
  );
};
