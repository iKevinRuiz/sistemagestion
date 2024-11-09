import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function RegisterApp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        phone: '',
        direccion: '',
        municipio: '',  // Nuevo campo municipio
        idRole: 2
    });

    // Lista de municipios (simplificada para este ejemplo)
    const municipios = [
        'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena',
        'Bucaramanga', 'Pereira', 'Manizales', 'Santa Marta', 'Cúcuta'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            console.log(response.data.message);
            navigate('/');
        } catch (error) {
            console.error("There was an error registering!", error);
        }
    };

    return (
        <Container fluid className="h-100 bg-primary">
            <Row>
                <Col>
                    <div className="m-4">
                        <Card className="bg-light rounded-4 mx-auto my-4 shadow-lg">
                            <Card.Body className="mx-4 mt-3">
                                <div className="mb-2 text-center">
                                    <h3 className="fw-bold text-body-emphasis">Registro</h3>
                                </div>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="m-3">
                                                <Form.Label>Cédula</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="cedula"
                                                    onChange={handleChange}
                                                    value={formData.cedula}
                                                    className="w-100"
                                                />
                                            </Form.Group>
                                            <Form.Group className="m-3">
                                                <Form.Label>Nombres</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="nombre"
                                                    onChange={handleChange}
                                                    value={formData.nombre}
                                                    className="w-100"
                                                />
                                            </Form.Group>
                                            <Form.Group className="m-3">
                                                <Form.Label>Apellidos</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="apellido"
                                                    onChange={handleChange}
                                                    value={formData.apellido}
                                                    className="w-100"
                                                />
                                            </Form.Group>
                                            <Form.Group className="m-3">
                                                <Form.Label>Correo</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    onChange={handleChange}
                                                    value={formData.email}
                                                    className="w-100"
                                                />
                                            </Form.Group>
                                            <Form.Group className="m-3">
                                                
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="m-3">
                                                <Form.Label>Contraseña</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    onChange={handleChange}
                                                    value={formData.password}
                                                    className="w-100"
                                                />
                                            </Form.Group>
                                            <Form.Group className="m-3">
                                                <Form.Label>Celular</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    onChange={handleChange}
                                                    value={formData.phone}
                                                    className="w-100"
                                                />
                                            </Form.Group>
                                            <Form.Group className="m-3">
                                                <Form.Label>Dirección</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="direccion"
                                                    onChange={handleChange}
                                                    value={formData.direccion}
                                                    className="w-100"
                                                />
                                            </Form.Group>
                                            <Form.Label>Municipio</Form.Label> {/* Campo tipo select */}
                                                <Form.Select
                                                    name="municipio"
                                                    onChange={handleChange}
                                                    value={formData.municipio}
                                                    className="w-100"
                                                >
                                                    <option value="">Selecciona un municipio</option>
                                                    {municipios.map((municipio, index) => (
                                                        <option key={index} value={municipio}>
                                                            {municipio}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" type="submit" className="w-100">Registrar</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterApp;
