import React from "react";
import { Table, Spinner } from "reactstrap";

const numbers = ["P04", "P05", "P06", "P07", "P08"];

export const Logs = () => {
  return (
    <div className="mt-5">
      <Table dark style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Process</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>P01</td>
            <td>Pay Rent</td>
            <td>
              <Spinner size="sm" color="primary" />{" "}
            </td>
            <td>11-11-2011 11:11</td>
          </tr>
          <tr>
            <td>P02</td>
            <td>Purchase of Glass Bottles</td>
            <td>
              <Spinner size="sm" color="primary" />{" "}
            </td>
            <td>22-22-2022 22:22</td>
          </tr>
          <tr>
            <td>P03</td>
            <td>Anual intercompany party expenses (No Alcohol expenses)</td>
            <td>
              <Spinner size="sm" color="primary" />{" "}
            </td>
            <td>22-22-2022 22:22</td>
          </tr>
          <PrintLogs></PrintLogs>
        </tbody>
      </Table>
    </div>
  );
};

const PrintLogs = () => {
  const listItems = numbers.map((number) => (
    <tr>
      <td>{number}</td>
    </tr>
  ));
  return <div>{listItems}</div>;
};
