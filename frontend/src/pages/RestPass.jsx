import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword) {
            setErrorMessage('Por favor ingrese una nueva contraseña.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, {
                newPassword,
            });
            setSuccessMessage(response.data.message);
            navigate('/');
        } catch (error) {
            setErrorMessage('Hubo un error al restablecer la contraseña.');
        }
    };

    return (
        <Container fluid className="h-100">
            <Row>
                <Col>
                    <div className="m-4">
                        <Card className="bg-light rounded-4 mx-auto my-4 shadow-lg">
                            <Card.Body className="mx-4 mt-3">
                                <h3 className="text-center">Restablecer Contraseña</h3>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="m-3">
                                        <Form.Label>Nueva Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Ingrese su nueva contraseña"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" className="w-100" type="submit">
                                        Restablecer Contraseña
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

export default ResetPassword;
