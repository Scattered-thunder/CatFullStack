import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { updateClient, addClient } from "../redux/slices/clientSlice";
import { Client } from "../models/Client";
import { crearCliente, editarCliente } from "../services/client";

interface DetailsModalProps {
  IsOpen: boolean;
  onClose: () => void;
  toEditClient: Client;
  setEditedClient: React.Dispatch<React.SetStateAction<Client>>;
}

export default function DetailsModal({
  IsOpen,
  onClose,
  toEditClient,
  setEditedClient,
}: Readonly<DetailsModalProps>) {
  const dispatch = useDispatch();

  const [message, setMessage] = useState<string>("");

  const isNewClient = toEditClient.id == 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedClient((previousState: any) => ({
      ...previousState,
      [name]: value,
    }));
    setMessage("");
  };

  const handleSave = async () => {
    if (isNewClient) {
      try {
        const NuevoCliente = await crearCliente(toEditClient);
        toEditClient.id = NuevoCliente.id;
        dispatch(addClient(toEditClient));
        setMessage("Cliente nuevo guardado con éxito");
      } catch (error: any) {
        setMessage(error.toString());
      }
    } else {
      dispatch(updateClient(toEditClient));
      try {
        console.log(toEditClient);
        await editarCliente(toEditClient.id, toEditClient);
        setMessage("Cliente actualizado con éxito");
      } catch (error: any) {
        setMessage(error.toString());
      }
    }
    onClose();
  };

  return (
    <Modal
      open={IsOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Editar Cliente
        </Typography>
        <TextField
          fullWidth
          name="name"
          label="Nombre"
          value={toEditClient.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="surname"
          label="Apellido"
          value={toEditClient.surname}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="mail"
          label="Email"
          value={toEditClient.mail}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="country"
          label="Pais"
          value={toEditClient.country}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Typography sx={{ color: "black", margin: "5px" }}>
          {message}
        </Typography>
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onClose}
          sx={{ ml: 2 }}
        >
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
}
