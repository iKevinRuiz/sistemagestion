import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios"; // Importamos Axios

function Usuarios() {
  // Estado para almacenar los usuarios
  const [usuarios, setUsuarios] = useState([]);

  // Efecto para obtener la información de los usuarios
  useEffect(() => {
    // Hacer una solicitud GET al backend para obtener los usuarios usando Axios
    axios.get("http://localhost:5000/api/usuarios")  // Cambia la URL si es necesario
      .then((response) => {
        setUsuarios(response.data);  // Guardar los usuarios en el estado
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }, []); // El array vacío hace que esto solo se ejecute una vez cuando se monta el componente

  return (
    <>
      <div>
        <h2>Usuarios</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>CC</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.idUser}>
                  <td>{usuario.cedula}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <Button variant="primary">Editar</Button>
                    <Button variant="info">Consultar</Button>
                    <Button variant="danger">Inhabilitar</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay usuarios disponibles
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Usuarios;
