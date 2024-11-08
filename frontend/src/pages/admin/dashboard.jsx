import React, { useState } from "react";
import Usuarios from "./componentes/usuarios";
import { Nav } from "react-bootstrap";
import RegisterAdmin from "./componentes/registerAdmin";

function AdminDashboard () {
    const [activeKey, setActiveKey] = useState('/active');

    const renderContent = () => {
        switch (activeKey) {
            case '/active':
                return <Usuarios/>; 
            case 'link-1':
                return <RegisterAdmin />;
            default:
                return null;
        }
    };

    return(
        <>
            <Nav variant="tabs" fill defaultActiveKey="/active" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                <Nav.Item>
                    <Nav.Link eventKey="/active">Usurios</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Registro</Nav.Link>
                </Nav.Item>
            </Nav>
            <div>
                {renderContent()}
            </div>
        </>
    )
}

export default AdminDashboard;