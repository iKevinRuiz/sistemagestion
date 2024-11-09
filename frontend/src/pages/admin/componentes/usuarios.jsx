import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import axios from "axios";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false); // Para controlar la visibilidad del modal
  const [editedData, setEditedData] = useState({
    idUser: "",
    idRole: "",
    cedula: "",
    nombre: "",
    apellido: "",
    email: "",
    phone: "",
    direccion: "",
    municipio: "",
  });

  // Obtener los usuarios del backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/usuarios")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }, []);

  // Función para manejar la edición
  const handleEdit = (id) => {
    const usuario = usuarios.find((user) => user.idUser === id);
    if (usuario) {
      setEditedData({
        idUser: usuario.idUser,
        idRole: usuario.idRole,
        cedula: usuario.cedula,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        phone: usuario.phone,
        direccion: usuario.direccion,
        municipio: usuario.municipio,
      });
      setShowEditModal(true); // Mostrar el modal de edición
    }
  };

  // Función para manejar cambios en el formulario de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario de edición
  const handleSave = () => {
    axios.put(`http://localhost:5000/api/usuarios/editar/${editedData.idUser}`, editedData)
      .then((response) => {
        // Actualizamos el estado de los usuarios para reflejar el cambio
        const updatedUser = response.data;

        setUsuarios(usuarios.map((usuario) =>
          usuario.idUser === updatedUser.idUser ? { ...usuario, ...updatedUser } : usuario
        ));

        setShowEditModal(false); // Cerrar el modal después de guardar
        alert('Usuario actualizado correctamente');
      })
      .catch((error) => {
        console.error('Error al editar el usuario:', error.response ? error.response.data : error.message);
        alert('Hubo un problema al actualizar el usuario');
      });
  };

  // Función para manejar la consulta
  const handleConsult = (id) => {
    axios.get(`http://localhost:5000/api/usuarios/consultar/${id}`)
      .then((response) => {
        alert(`Nombre: ${response.data.nombre}\nEmail: ${response.data.email}`);
      })
      .catch((error) => {
        console.error("Error al consultar el usuario:", error);
      });
  };

  // Función para manejar la inhabilitación
  const handleDisable = (id) => {
    axios.put(`http://localhost:5000/api/usuarios/inhabilitar/${id}`)
      .then((response) => {
        setUsuarios(usuarios.map((usuario) =>
          usuario.idUser === id ? { ...usuario, estado: "inhabilitado" } : usuario
        ));
        alert("Usuario inhabilitado correctamente");
      })
      .catch((error) => {
        console.error("Error al inhabilitar el usuario:", error);
      });
  };

  return (
    <>
      <h2>Usuarios</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Role</th>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Municipio</th>
            <th>Fecha de Creación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.idUser}>
                <td>{usuario.idUser}</td>
                <td>{usuario.idRole}</td>
                <td>{usuario.cedula}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.phone}</td>
                <td>{usuario.direccion}</td>
                <td>{usuario.municipio}</td>
                <td>{usuario.fechaCreacion}</td>
                <td>{usuario.estado}</td>
                <td>
                  <Button onClick={() => handleConsult(usuario.idUser)} variant="info">Consultar</Button>
                  <Button onClick={() => handleEdit(usuario.idUser)} variant="warning">Editar</Button>
                  <Button onClick={() => handleDisable(usuario.idUser)} variant="danger">Inhabilitar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12">No hay usuarios disponibles</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={editedData.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={editedData.apellido}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editedData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={editedData.direccion}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMunicipio">
              <Form.Label>Municipio</Form.Label>
              <Form.Control
                type="text"
                name="municipio"
                value={editedData.municipio}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Usuarios;
