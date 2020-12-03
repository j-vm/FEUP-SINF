import React from "react";
import { Table} from 'reactstrap';


export const Info = () => {
  return (
	<div className="mt-5" style={{ display: "flex" }}>
    <Table dark>
            <thead class="thead-dark">
              <tr>
                <th scope="col">Company 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name: KSede</td>
              </tr>
              <tr>
                <td>Tenant:</td>
              </tr>
              <tr>
                <td>Client ID:</td>
              </tr>
              <tr>
                <td>Client Secret:</td>
              </tr>
            </tbody>
          </Table>

	  <span>&nbsp;&nbsp;</span>

    <Table dark>
            <thead class="thead-dark">
              <tr>
                <th scope="col">Company 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name: KSede</td>
              </tr>
              <tr>
                <td>Tenant:</td>
              </tr>
              <tr>
                <td>Client ID:</td>
              </tr>
              <tr>
                <td>Client Secret:</td>
              </tr>
            </tbody>
          </Table>
    </div>
  );
};
