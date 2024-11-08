import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function Usuarios() {
    return (
        <>
            <div>
                <h2>Usuarios</h2>
                <Link to='registerAdmin'>
                    <Button>Registrar usuario</Button>
                </Link>
            </div>
        </>
    )
}

export default Usuarios;