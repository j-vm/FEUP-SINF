import React, { useState } from "react";
import { Table, Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { useAuth } from "../../auth";

async function getItems(company, token) {
  const response = await fetch(`/api/companies/${company}/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

async function getAssociations(token) {
  const response = await fetch("/api/item-associations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

async function getData(token) {
  const data = Promise.all([
    getItems(1, token),
    getItems(2, token),
    getAssociations(token),
  ]);
  return await data;
}

function AssociationTable({ data }) {
  const [items1, items2, associations] = data;
  return (
    <Table dark striped>
      <thead class="thead-dark">
        <tr>
          <th scope="col">ProductID-1</th>
          <th scope="col">Name</th>
          <th scope="col">ProductID-2</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {associations.map((association) => {
          const { company1Id, company2Id } = association;
          const item1 = items1.find((item) => item.key === company1Id);
          const item2 = items2.find((item) => item.key === company2Id);
          return (
            <tr>
              <td>{item1.key}</td>
              <td>{item1.description}</td>
              <td>{item2.key}</td>
              <td>{item2.description}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export const Sync = () => {
  const [data, setData] = useState(null);
  const { token } = useAuth();

  getData(token).then(setData);

  return data !== null ? (
    <Container>
      <AssociationTable data={data} />
    </Container>
  ) : (
    <p> Loading </p>
  );
};
