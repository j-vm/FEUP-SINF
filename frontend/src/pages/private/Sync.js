import React, { useState } from "react";
import { Table, Col, Button, Form, Label, Input, Row } from "reactstrap";
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

async function addAssociation(token, company1Id, company2Id) {
    const response = await fetch(`/api/item-associations`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ company1Id, company2Id }),
    });
    return await response.json();
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
            <thead className="thead-dark">
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
                    <td colSpan="5" className="text-center">No records found</td>
                </tr>
            ) : (
                associations.map((association, i) => {
                    const { company1Id, company2Id } = association;
                    const item1 = items1.find((item) => item.key === company1Id);
                    const item2 = items2.find((item) => item.key === company2Id);
                    return (
                    <tr key={i}>
                        <td className="text-center align-middle">{item1.key}</td>
                        <td className="text-center align-middle">{item1.description}</td>
                        <td className="text-center align-middle">{item2.key}</td>
                        <td className="text-center align-middle">{item2.description}</td>
                        <td className="text-center align-middle">
                            <Button
                                color="danger"
                                onClick={() => onDelete(company1Id, company2Id)}
                            >X
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

function AddAssociationForm({ company1Items, company2Items, onAdd }) {
    const [clicked, setClicked] = useState(false);
    const [item1, setItem1] = useState("");
    const [item2, setItem2] = useState("");
    return (
        <Form>
            <h2>Add association</h2>
            <Row className="mt-3">
                <Col>
                    <Label for="item1">Company 1 ID</Label>
                    <Input type="select" name="item1" value={item1}
                        onChange={(e) => {
                            const { value } = e.target;
                            setItem1(value);
                        }}>
                        <option value="" key={0}>Select item</option>
                        {company1Items.map((item, i) => (
                            <option key={i + 1} value={item.key}>{item.description}</option>
                        ))}
                    </Input>
                </Col>
                <Col>
                    <Label for="item2">Company 2 ID</Label>
                    <Input type="select" name="item2" value={item2} 
                        onChange={(e) => {
                            const { value } = e.target;
                            setItem2(value);
                        }}>
                        <option value="" key={0}>Select item</option>
                        {company2Items.map((item, i) => (
                            <option value={item.key} key={i + 1}>{item.description}</option>
                        ))}
                    </Input>
                </Col>
            </Row>
            <Row>
                <Col className="text-right">
                    <Button color="primary" disabled={clicked || item1 === "" || item2 === ""}
                        onClick={() => {
                            setClicked(true);
                            onAdd(item1, item2, () => {
                                setClicked(false);
                                setItem1("");
                                setItem2("");
                            });
                        }}
                    className="mt-3">
                        Add Association
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export const Sync = () => {
    const [data, setData] = useState(null);
    const { token } = useAuth();

    if (data === null) getData(token).then(setData);

    const onDelete = (company1Id, company2Id) =>
        deleteAssociation(token, company1Id, company2Id).then(() => {
        setData((data) => [
            data[0],
            data[1],
            data[2].filter(
                (val) => val.company1Id !== company1Id || val.company2Id !== company2Id
            ),
        ]);
    });

    const onAdd = async (company1Id, company2Id, setDone) => {
        const result = await addAssociation(token, company1Id, company2Id);
        const newAssociations = [...data[2], result];
        const newData = [data[0], data[1], newAssociations];
        setData(newData);
        setDone();
    };

    const availableItems1 = () => {
        const usedKeys = data[2].map((a) => a.company1Id);
        return data[0].filter((item) => !usedKeys.includes(item.key));
    };

    const availableItems2 = () => {
        const usedKeys = data[2].map((a) => a.company2Id);
        return data[1].filter((item) => !usedKeys.includes(item.key));
    };

    return data !== null ? (
    <>
        <Row>
            <Col sm="12">
                    <AddAssociationForm
                    company1Items={availableItems1()}
                    company2Items={availableItems2()}
                    onAdd={onAdd}
                    ></AddAssociationForm>
            </Col>
            <Col sm="12" className="mt-5">
                <h2>Products Association Listing</h2>
                <AssociationTable data={data} onDelete={onDelete} />
            </Col>
        </Row>
    </>
    ) : (
        <p> Loading ...</p>
    );
};
