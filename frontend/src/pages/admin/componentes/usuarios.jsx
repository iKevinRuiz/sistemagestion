import React from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


function Usuarios() {
    return (
        <>
            <div>
                <h2>Usuarios</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>CC</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>
                                <Button>
                                    Editar
                                </Button>
                                <Button>
                                    Consultar
                                </Button>
                                <Button>
                                    Inhabilitar
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Usuarios;