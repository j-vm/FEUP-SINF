import React, { useState } from "react";
import { Table, Spinner } from "reactstrap";
import { useAuth } from "../../auth";

async function getLogs(token) {
  const response = await fetch(`/api/processes/executions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

async function getData(token) {
  const data = Promise.all([getLogs(token)]);
  return await data;
}

function LogsTable({ logs }) {
  return (
    <div className="mt-5">
      <Table dark style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Process</th>
            <th>id</th>
            <th>Ongowing Step</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="5~4" className="text-center">
                No logs found
              </td>
            </tr>
          ) : (
            logs.map((log) => {
              const { id, name, stepAt, done } = log;
              return (
                <tr>
                  <td className="text-center align-middle">{id}</td>
                  <td className="text-center align-middle">{name}</td>
                  <td className="text-center align-middle">{stepAt}</td>
                  <td className="text-center align-middle">
                    {done ? "done" : <Spinner></Spinner>}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
}

export const Logs = () => {
  const [data, setData] = useState(null);
  const { token } = useAuth();

  if (data === null) getData(token).then(setData);
  console.log(data);
  return data !== null ? <LogsTable logs={data[0]} /> : <p> Loading ...</p>;
};
