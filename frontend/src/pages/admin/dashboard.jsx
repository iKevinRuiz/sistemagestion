import React, { useState, useEffect } from "react";
import Usuarios from "./componentes/usuarios";
import { Nav, Button } from "react-bootstrap";
import RegisterAdmin from "./componentes/registerAdmin";
import { useNavigate } from "react-router-dom";  // Asegúrate de importar el hook useNavigate

function AdminDashboard() {
    const [activeKey, setActiveKey] = useState('/active');
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate(); // Inicializar useNavigate para la redirección

    useEffect(() => {
        // Verificar si hay un token en el localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            // Si no hay token, redirigir al inicio
            navigate('/');
        } else {
            // Obtener el rol desde localStorage
            const storedRole = localStorage.getItem('role');
            if (storedRole) {
                setUserRole(parseInt(storedRole));  // Asumiendo que el role es un número entero
            }
        }
    }, [navigate]);  // Dependencia de `navigate` para asegurarse de que la redirección funcione correctamente

    // Función para cerrar sesión
    const handleLogout = () => {
        // Eliminar los datos del usuario almacenados en localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('firstName');
        localStorage.removeItem('idUser');
        
        // Redirigir al usuario a la página principal (la raíz del sitio)
        navigate('/');  // Redirige a la página principal (http://localhost:3000/)
    };

    const renderContent = () => {
        switch (activeKey) {
            case '/active':
                return <Usuarios />;
            case 'link-1':
                return <RegisterAdmin />;
            default:
                return null;
        }
    };

    return (
        <>
            {/* Menú de navegación */}
            <Nav variant="tabs" fill defaultActiveKey="/active" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                <Nav.Item>
                    <Nav.Link eventKey="/active">Usuarios</Nav.Link>
                </Nav.Item>
                {/* Solo mostrar el botón de "Registro" si el rol es 1 */}
                {userRole === 1 && (
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">Registro</Nav.Link>
                    </Nav.Item>
                )}
            </Nav>

            {/* Contenido renderizado según la selección */}
            <div>
                {renderContent()}
            </div>

            {/* Botón de Cerrar sesión solo en el apartado de "Usuarios" */}
            {activeKey === '/active' && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px', // Distancia desde el borde inferior
                    right: '20px',  // Distancia desde el borde derecho
                    zIndex: 1000   // Asegurarse de que el botón quede encima de otros elementos
                }}>
                    <Button variant="danger" onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                </div>
            )}
        </>
    );
}

export default AdminDashboard;
