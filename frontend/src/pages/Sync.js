import React from "react";
import { Table, Breadcrumb, BreadcrumbItem } from "reactstrap";

export const Sync = () => {
  return (
    <div className="mt-5">
      <div class="row mt-5">
        <div class="col-6">
          Company 1
          <Breadcrumb>
            <BreadcrumbItem active>KSede</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="col-6">
          Company 2
          <Breadcrumb>
            <BreadcrumbItem active>BottleFlip</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      

      <div class="row mt-5">
        <div class="col-4">
          <Table dark striped>
            <thead class="thead-dark">
              <tr>
                <th scope="col">ProductID-1</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">B001</th>
                <td>Glass 25cl</td>
              </tr>
              <tr>
                <th scope="row">B002</th>
                <td>Glass 50cl</td>
              </tr>
              <tr>
                <th scope="row">B003</th>
                <td>Glass 1L</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div class="col-4">
          <Table dark striped>
            <thead class="thead-dark">
              <tr>
                <th scope="col">ProductID-2</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">B0T25</th>
                <td>Bottle 25cl</td>
              </tr>
              <tr>
                <th scope="row">B0T33</th>
                <td>Bottle 33cl</td>
              </tr>
              <tr>
                <th scope="row">B0T50</th>
                <td>Bottle 50cl</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div class="col-4">
          <Table dark >
            <thead class="thead-dark">
              <tr>
                <th scope="col">ProductID-1</th>
                <th scope="col">ProductID-2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>B001</td>
                <td>B0T25</td>
              </tr>
              <tr>
                <td>B002</td>
                <td>B0T33</td>
              </tr>
              <tr>
                <td>ItemIDCompany1</td>
                <td>ItemIDCompany2</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
