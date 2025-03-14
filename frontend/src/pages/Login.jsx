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
    
            // Verifica lo que llega en la respuesta
            console.log(response.data);
    
            // Almacenar el token y rol en localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role); // Guardar el rol del usuario
            localStorage.setItem('firstName', response.data.firstName);  // Guardar el primer nombre


    
            // Redirigir según el rol
            const userRole = response.data.role;
            if (userRole === 1) {
                navigate('/dashboard');
            } else {
                navigate('/dashboard');
            }
    
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            if (error.response && error.response.status === 403) {
                setErrorMessage('Usuario inhabilitado. Contacte al administrador.');
            } else {
                setErrorMessage('Correo o contraseña incorrectos.');
            }
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
