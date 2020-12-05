import React from "react";
import { Table, Button, Breadcrumb, BreadcrumbItem } from "reactstrap";

export const Process = () => {
  return (
    <div className="mt-5">
      <div>
        <Button color="secondary">Edit</Button>{" "}
        <Button color="danger">Delete</Button>{" "}
      </div>
      <div className="row mt-5">
        <div className="col-6">
          Company 1
          <Breadcrumb>
            <BreadcrumbItem active>KSede</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="col-6">
          Company 2
          <Breadcrumb>
            <BreadcrumbItem active>BottleFlip</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      <Table dark striped style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Trigger</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">01</th>
            <td>Wait for purchase order</td>
            <td>Generate sell order</td>
          </tr>
          <tr>
            <th scope="row">02</th>
            <td>Wait for delivery note</td>
            <td>Generate order receipt</td>
          </tr>
          <tr>
            <th scope="row">03</th>
            <td>Wait for order payment</td>
            <td>Generate payment receipt</td>
          </tr>
        </tbody>
      </Table>
      <div style={{ display: "flex" }}>
        <Button
          onClick={(event) => (window.location.href = "/processes/")}
          style={{ marginLeft: "auto" }}
          color="success"
        >
          Confirm
        </Button>{" "}
      </div>
    </div>
  );
};
