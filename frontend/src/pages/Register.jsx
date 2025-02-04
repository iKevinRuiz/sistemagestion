import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { FaTimes } from 'react-icons/fa'; // Para el ícono de la "X"
import municipiosData from './admin/componentes/municipios'; // Asegúrate de que esta ruta sea correcta

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
        idRole: 2,
        municipio: ''  // Municipio seleccionado
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMunicipios, setFilteredMunicipios] = useState([]);
    const [isMunicipioSelected, setIsMunicipioSelected] = useState(false);  // Estado para saber si el municipio fue seleccionado

    // Filtrar municipios basados en la búsqueda
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filtrar los municipios que coinciden con la búsqueda
        if (query) {
            const municipiosDisponibles = municipiosData
                .flatMap(dpto => dpto.ciudades)  // Obtener todos los municipios
                .filter(municipio => municipio.toLowerCase().includes(query.toLowerCase()));
            setFilteredMunicipios(municipiosDisponibles);
        } else {
            setFilteredMunicipios([]);
        }
    };

    const handleMunicipioSelect = (municipio) => {
        setFormData({ ...formData, municipio });
        setSearchQuery(municipio);
        setIsMunicipioSelected(true);  // El municipio fue seleccionado
        setFilteredMunicipios([]);  // Ocultar la lista después de seleccionar
    };

    const handleMunicipioClear = () => {
        setFormData({ ...formData, municipio: '' });  // Borrar el municipio seleccionado
        setSearchQuery('');  // Limpiar la búsqueda
        setIsMunicipioSelected(false);  // Permitir la búsqueda nuevamente
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos a enviar:', formData); // Verifica los datos que se están enviando
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
                                            <Form.Group className="m-3">
                                                <Form.Label>Municipio</Form.Label>
                                                <div style={{ position: 'relative' }}>
                                                    <Form.Control
                                                        type="text"
                                                        name="municipio"
                                                        onChange={handleSearchChange}
                                                        value={searchQuery}
                                                        className="w-100"
                                                        placeholder="Escribe el municipio"
                                                        readOnly={isMunicipioSelected} // Hacer solo lectura después de seleccionar
                                                    />
                                                    {/* Mostrar la X para borrar */}
                                                    {isMunicipioSelected && (
                                                        <span
                                                            onClick={handleMunicipioClear}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)',
                                                                cursor: 'pointer',
                                                                color: 'blue', // Azul
                                                                fontSize: '18px',
                                                            }}
                                                        >
                                                            <FaTimes />
                                                        </span>
                                                    )}
                                                </div>
                                                {/* Mostrar los municipios filtrados */}
                                                {filteredMunicipios.length > 0 && searchQuery && !isMunicipioSelected && (
                                                    <ul className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                                        {filteredMunicipios.map((municipio, index) => (
                                                            <li
                                                                key={index}
                                                                className="list-group-item"
                                                                onClick={() => handleMunicipioSelect(municipio)}
                                                            >
                                                                {municipio}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </Form.Group>
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
    );
}

export default RegisterApp;
