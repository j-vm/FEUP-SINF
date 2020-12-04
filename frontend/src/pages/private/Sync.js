import React, { useState } from "react";
import { Table, Container, Button } from "reactstrap";
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

async function deleteAssociation(token, company1Id, company2Id) {
  await fetch(`/api/item-associations/${company1Id}/${company2Id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 *
 * @param props Properties object
 * @param props.data Data array containing company 1's items, company 2's items and the associations
 * @param props.onDelete callback to be called when a delete button is pressed, receives id1 and id2 as parameter
 */
function AssociationTable({ data, onDelete }) {
  const [items1, items2, associations] = data;
  return (
    <Table dark striped>
      <thead class="thead-dark">
        <tr>
          <th scope="col" className="text-center">
            ProductID-1
          </th>
          <th scope="col" className="text-center">
            Name
          </th>
          <th scope="col" className="text-center">
            ProductID-2
          </th>
          <th scope="col" className="text-center">
            Name
          </th>
          <th scope="col" className="text-center">
            Delete Association
          </th>
        </tr>
      </thead>
      <tbody>
        {associations.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">
              No records found
            </td>
          </tr>
        ) : (
          associations.map((association) => {
            const { company1Id, company2Id } = association;
            const item1 = items1.find((item) => item.key === company1Id);
            const item2 = items2.find((item) => item.key === company2Id);
            return (
              <tr>
                <td className="text-center align-middle">{item1.key}</td>
                <td className="text-center align-middle">
                  {item1.description}
                </td>
                <td className="text-center align-middle">{item2.key}</td>
                <td className="text-center align-middle">
                  {item2.description}
                </td>

                <td className="text-center align-middle">
                  <Button
                    color="danger"
                    onClick={() => onDelete(company1Id, company2Id)}
                  >
                    X
                  </Button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
}

export const Sync = () => {
  const [data, setData] = useState(null);
  const { token } = useAuth();

  getData(token).then(setData);

  const onDelete = (company1Id, company2Id) =>
    deleteAssociation(token, company1Id, company2Id).then(() => {
      const key = data[2].findIndex(
        (val) => val.company1Id === company1Id && val.company2Id === company2Id
      );
      const newData = [...data];
      newData[2].splice(key, 1);
    });

  return data !== null ? (
    <Container>
      <AssociationTable data={data} onDelete={onDelete} />
    </Container>
  ) : (
    <p> Loading </p>
  );
};
