import React from "react";
import { Table } from "reactstrap";
import { Button } from "reactstrap";

export const Processes = () => {
  return (
    <div className="mt-5">
      <div>
        <Button
          onClick={(event) => (window.location.href = "/process/1")}
          color="info"
        >
          Add New Process
        </Button>{" "}
      </div>
      <div className="mt-2">
        <Table dark style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Process Name</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P001</td>
              <td>Process description</td>
              <td>Crtl</td>
            </tr>
            <tr>
              <td>P002</td>
              <td>Process description</td>
              <td>Crtl</td>
            </tr>
            <tr>
              <td>P003</td>
              <td>Process description</td>
              <td>Crtl</td>
            </tr>
            <tr>
              <td>P004</td>
              <td>Process description</td>
              <td>Crtl</td>
            </tr>
            <tr>
              <td>P005</td>
              <td>Process description</td>
              <td>Crtl</td>
            </tr>
            <tr>
              <td>P006</td>
              <td>Process description</td>
              <td>Crtl</td>
            </tr>
            <tr>
              <td>P007</td>
              <td>Process description</td>
              <td>Crtl</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};
