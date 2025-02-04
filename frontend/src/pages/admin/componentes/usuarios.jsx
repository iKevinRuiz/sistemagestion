import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";

function Usuarios() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConsultModal, setShowConsultModal] = useState(false);
    const [userData, setUserData] = useState({
        idUser: "",
        cedula: "",
        firstName: "",
        lastName: "",
        idRole: "",
        email: "",
        phone: "",
        direccion: "",
        municipio: "",
        estado: "activo",
    });
    const [consultData, setConsultData] = useState({});
    const [error, setError] = useState("");
    const userRole = localStorage.getItem('role'); // Leer el rol del usuario
    // Obtener datos del usuario logueado desde localStorage o realizar otra llamada a la API si es necesario
    const [loggedUserName, setLoggedUserName] = useState(localStorage.getItem('firstName') || '');

    useEffect(() => {
        // Verificar si el nombre del usuario ya está almacenado en el localStorage
        const storedName = localStorage.getItem('firstName');
        if (storedName) {
            setLoggedUserName(storedName);
        }

        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/all', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error al obtener los datos de los usuarios:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setUserData({ ...user });
        setShowEditModal(true);
    };

    const handleConsultClick = (user) => {
        const { estado, ...consultUserData } = user;
        setConsultData(consultUserData);
        setShowConsultModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!userData.firstName || !userData.lastName || !userData.email || !userData.phone) {
            setError("Todos los campos son obligatorios.");
            return false;
        }
        setError("");
        return true;
    };

    const handleUpdateUser = async () => {
        if (!validateForm()) return;
    
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/users/${userData.idUser}`,
                userData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setShowEditModal(false);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.idUser === userData.idUser ? { ...user, ...userData } : user
                )
            );
    
            // Actualiza el localStorage con el nuevo firstName
            localStorage.setItem('firstName', userData.firstName);
            setLoggedUserName(userData.firstName);  // Asegura que el estado también se actualice
    
        } catch (error) {
            console.error("Error al actualizar los datos del usuario:", error);
        }
    };
    

    return (
        <div>
            <h2>Bienvenido (a)</h2>
            {/* Mostrar el nombre del usuario logueado 
            <h2>Bienvenido: {loggedUserName}</h2>*/}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>CC</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Rol</th>
                        <th>Correo</th>
                        <th>Celular</th>
                        <th>Direccion</th>
                        <th>Municipio</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.idUser}>
                                <td>{user.idUser}</td>
                                <td>{user.cedula}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.idRole}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.direccion}</td>
                                <td>{user.municipio}</td>
                                <td>{user.estado}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleEditClick(user)}
                                        disabled={userRole !== '1'} // Deshabilitado si el rol no es '1'
                                    >
                                        Editar
                                    </Button>{' '}
                                    <Button variant="info" onClick={() => handleConsultClick(user)}>
                                        Consultar
                                    </Button>{' '}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="text-center">Cargando...</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Modal de edición */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="formFirstName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={userData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="formLastName">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={userData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="formDireccion">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="direccion"
                                        value={userData.direccion}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="formMunicipio">
                                    <Form.Label>Municipio</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="municipio"
                                        value={userData.municipio}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group controlId="formEstado">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                as="select"
                                name="estado"
                                value={userData.estado}
                                onChange={handleInputChange}
                            >
                                <option value="activo">Activo</option>
                                <option value="inhabilitado">Inhabilitado</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cerrar</Button>
                    <Button variant="primary" onClick={handleUpdateUser}>Actualizar</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de consulta */}
            <Modal show={showConsultModal} onHide={() => setShowConsultModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Consultar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Nombre:</strong> {consultData.firstName} {consultData.lastName}</p>
                    <p><strong>CC:</strong> {consultData.cedula}</p>
                    <p><strong>Correo:</strong> {consultData.email}</p>
                    <p><strong>Celular:</strong> {consultData.phone}</p>
                    <p><strong>Dirección:</strong> {consultData.direccion}</p>
                    <p><strong>Municipio:</strong> {consultData.municipio}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConsultModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Usuarios;
