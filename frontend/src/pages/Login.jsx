import React, { useState } from "react";
import { Container, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function LoginApp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = () => {
        navigate('/register');
    };

    const handleForgotPass = () => {
        navigate('/forgot-password');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Por favor ingrese su correo y contraseña.');
            return;
        }

        try {
            // Enviar la solicitud al backend para hacer el login
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password,
            });

            // Almacenar el token en localStorage
            localStorage.setItem('token', response.data.token);

            // Revisar el idRole recibido en la respuesta
            const userRole = response.data.role;

            // Redirigir según el rol
            if (userRole === 1) {
                // Si el rol es 'admin', redirigir a /dashboard
                navigate('/dashboard');
            } else {
                // Si el rol es diferente a 1 (suponiendo que sea cliente), redirigir a /tienda
                navigate('/tienda');
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setErrorMessage('Correo o contraseña incorrectos.');
        }
    };

    return (
        <>
            <Container fluid className="h-100">
                <Row>
                    <Col>
                        <div className="m-4">
                            <Card className="bg-light rounded-4 mx-auto my-4 shadow-lg">
                                <Card.Body className="mx-4 mt-3">
                                    <div className="mb-2 text-center">
                                        <h3 className="fw-bold text-body-emphasis">Iniciar sesión</h3>
                                    </div>
                                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                    <Form onSubmit={handleLogin}>
                                        <Form.Group className="m-3">
                                            <Form.Label>Correo</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="ingresa tu email aqui"
                                                className="w-100"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="m-3">
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="ingresa tu contraseña aqui"
                                                className="w-100"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" className="w-100" type="submit">
                                            Ingresar
                                        </Button>
                                    </Form>
                                </Card.Body>
                                <Row>
                                    <Col>
                                        <div className="text-center mb-2">
                                            <Button variant="link" className="text-decoration-none" onClick={handleRegister}>Registrarse</Button>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="text-center mb-2">
                                            <Button variant='link' className="text-decoration-none" onClick={handleForgotPass}>Olvidé mi contraseña</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LoginApp;
