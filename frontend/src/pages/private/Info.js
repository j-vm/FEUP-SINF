import React, { useState } from "react";
import { Table, Row, Col, Spinner } from "reactstrap";
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
    <Row className="mt-5">
      <Col md="6">
        <Table dark striped responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col" colSpan="2" className="text-center">
                Company 1
              </th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              if (info1.length > 0) {
                return (
                  <>
                    <tr>
                      <th scope="row">Name</th>
                      <td className="text-right align-middle">
                        {info1[1].name}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Currency</th>
                      <td className="text-right align-middle">
                        {info1[1].baseCurrency}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">City</th>
                      <td className="text-right align-middle">
                        {info1[1].cityName}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Address</th>
                      <td className="text-right align-middle">
                        {info1[1].streetName}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Zip Code</th>
                      <td className="text-right align-middle">
                        {info1[1].postalZone}
                      </td>
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
                  </>
                );
              } else {
                return (
                  <div>
                    <tr>
                      <td colSpan="2" className="text-center">
                        No records found
                      </td>
                    </tr>
                  </div>
                );
              }
            })()}
          </tbody>
        </Table>
      </Col>

      <Col md="6">
        <Table dark striped responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col" colSpan="2" className="text-center">
                Company 2
              </th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              if (info2.length > 0) {
                return (
                  <>
                    <tr>
                      <th scope="row">Name</th>
                      <td className="text-right align-middle">
                        {info2[1].name}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Currency</th>
                      <td className="text-right align-middle">
                        {info2[1].baseCurrency}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">City</th>
                      <td className="text-right align-middle">
                        {info2[1].cityName}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Address</th>
                      <td className="text-right align-middle">
                        {info2[1].streetName}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Zip Code</th>
                      <td className="text-right align-middle">
                        {info2[1].postalZone}
                      </td>
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
                  </>
                );
              } else {
                return (
                  <div>
                    <tr>
                      <td colSpan="2" className="text-center">
                        No records found
                      </td>
                    </tr>
                  </div>
                );
              }
            })()}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export const Info = () => {
  const [data, setData] = useState(null);
  const { token } = useAuth();

  if (data === null) getData(token).then(setData);

  return data !== null ? (
    <>
      <Row>
        <Col sm="12">
          <h1 className="text-center">Connection Information</h1>
          <InformationTables data={data} />
        </Col>
      </Row>
    </>
  ) : (
    <p>
      <Spinner style={{ width: "10rem", height: "10rem" }} />
    </p>
  );
};
