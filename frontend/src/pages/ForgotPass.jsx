import React, { useState } from "react";
import { Container, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setErrorMessage('Por favor ingrese su correo electrónico.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/forgot-password', { email });
            setSuccessMessage(response.data.message);
            setErrorMessage(''); // Limpiar cualquier mensaje de error anterior
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response?.data?.message || 'Hubo un error al enviar el correo. Verifique si el correo es válido.');
        }
              
    };

    return (
        <Container fluid className="h-100">
            <Row>
                <Col>
                    <div className="m-4">
                        <Card className="bg-light rounded-4 mx-auto my-4 shadow-lg">
                            <Card.Body className="mx-4 mt-3">
                                <h3 className="text-center">Recuperar Contraseña</h3>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="m-3">
                                        <Form.Label>Correo Electrónico</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Ingrese su correo"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" className="w-100" type="submit">
                                        Enviar enlace de recuperación
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ForgotPassword;
