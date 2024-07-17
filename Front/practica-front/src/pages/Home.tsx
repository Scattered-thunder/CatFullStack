import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { deleteClient, addClients } from "../redux/slices/clientSlice";
import { borrarCliente, fetchAllClients } from "../services/client";
import { Client } from "../models/Client";
import DetailsModal from "../components/DetailsModal";

export default function Home() {
  const clients = useSelector((state: RootState) => state.client.clients);
  const dispatch = useDispatch();

  const emptyClient: Client = {
    id: 0,
    name: "",
    surname: "",
    country: "",
    mail: "",
  };

  const [selectedClient, setSelectedClient] = useState<Client>(emptyClient);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await fetchAllClients();
        if (response) {
          dispatch(addClients(response));
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (clients.length === 0) {
      getClients();
    }
  }, [clients.length, dispatch]);

  const handleEdit = (id: number) => {
    const client = clients.find((client) => client.id === id);
    if (client) {
      setSelectedClient(client);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: number) => {
    const client = clients.find((client) => client.id === id);
    if (client) {
      dispatch(deleteClient(client.mail)); // Elimino en el Front
      await borrarCliente(client.id); // Elimino en el Back
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    setSelectedClient(emptyClient);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="User Info" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Apellido</TableCell>
              <TableCell align="center">Pais</TableCell>
              <TableCell align="center">Mail</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.surname}</TableCell>
                <TableCell align="center">{row.country}</TableCell>
                <TableCell align="center">{row.mail}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ margin: "10px" }}
                    onClick={() => handleEdit(row.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ margin: "10px" }}
                    onClick={() => handleDelete(row.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        sx={{ margin: "10px", backgroundColor: "green" }}
        onClick={handleAdd}
      >
        Agregar Cliente
      </Button>
      {selectedClient && (
        <DetailsModal
          IsOpen={isModalOpen}
          onClose={handleCloseModal}
          toEditClient={selectedClient}
          setEditedClient={setSelectedClient}
        />
      )}
    </Container>
  );
}
