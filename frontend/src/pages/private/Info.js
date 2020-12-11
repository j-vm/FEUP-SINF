import React, { useState } from "react";
import { Table, Row, Col } from "reactstrap";
import { useAuth } from "../../auth";

async function getInfo(company, token) {
  const response = await fetch(`/api/companies/${company}/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

async function getData(token) {
  const data = Promise.all([getInfo(1, token), getInfo(2, token)]);
  return await data;
}

function InformationTables({ data }) {
  const [info1, info2] = data;
  return (
    <Row>
      <Col>
        <Table dark striped responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col" colSpan="2" className="text-center">
                Company 1
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td className="text-right align-middle">{info1[1].name}</td>
            </tr>
            <tr>
              <th scope="row">Currency</th>
              <td className="text-right align-middle">
                {info1[1].baseCurrency}
              </td>
            </tr>
            <tr>
              <th scope="row">City</th>
              <td className="text-right align-middle">{info1[1].cityName}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td className="text-right align-middle">{info1[1].streetName}</td>
            </tr>
            <tr>
              <th scope="row">Zip Code</th>
              <td className="text-right align-middle">{info1[1].postalZone}</td>
            </tr>
            <tr>
              <th scope="row">Country</th>
              <td className="text-right align-middle">
                {info1[1].countryDescription}
              </td>
            </tr>
            <tr>
              <th scope="row">Created On</th>
              <td className="text-right align-middle">
                {info1[1].createdOn.substring(0, 10)}
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>

      <Col>
        <Table dark striped responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col" colSpan="2" className="text-center">
                Company 2
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td className="text-right align-middle">{info2[1].name}</td>
            </tr>
            <tr>
              <th scope="row">Currency</th>
              <td className="text-right align-middle">
                {info2[1].baseCurrency}
              </td>
            </tr>
            <tr>
              <th scope="row">City</th>
              <td className="text-right align-middle">{info2[1].cityName}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td className="text-right align-middle">{info2[1].streetName}</td>
            </tr>
            <tr>
              <th scope="row">Zip Code</th>
              <td className="text-right align-middle">{info2[1].postalZone}</td>
            </tr>
            <tr>
              <th scope="row">Country</th>
              <td className="text-right align-middle">
                {info2[1].countryDescription}
              </td>
            </tr>
            <tr>
              <th scope="row">Created On</th>
              <td className="text-right align-middle">
                {info2[1].createdOn.substring(0, 10)}
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

/* export const Info = () => {
  return (
    <div className="mt-5" style={{ display: "flex" }}>
      <Table dark striped>
        <thead className="thead-dark">
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
        <thead className="thead-dark">
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
}; */

export const Info = () => {
  const [data, setData] = useState(null);
  const { token } = useAuth();

  if (data === null) getData(token).then(setData);

  return data !== null ? (
    <InformationTables data={data} />
  ) : (
    <p> Loading ...</p>
  );
};
