import { Client } from "../models/Client";

// Fetching All Clients

export async function fetchAllClients(): Promise<Client[] | undefined> {
  try {
    const response = await fetch("http://localhost:8080/clients");
    if (!response.ok) {
      throw new Error("Error fetching clients");
    }
    const clientes: Client[] = await response.json();
    return clientes;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return undefined;
  }
}

// Create a Client

export async function crearCliente(cliente: Client) {
  try {
    const response = await fetch("http://localhost:8080/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) {
      throw new Error("Error creating client");
    }
    const nuevoClinte = await response.json();
    return nuevoClinte;
  } catch (error) {
    console.error("Error creating client: ", error);
    throw error;
  }
}

export async function editarCliente(id: number, cliente: Client) {
  try {
    const response = await fetch("http://localhost:8080/clients/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": cliente.name,
        "surname": cliente.surname,
        "country": cliente.country,
        "mail": cliente.mail,
      }),
    });
    if (!response.ok) {
      throw new Error("Error editing client");
    }
    console.log(response.status);
    return;
  } catch (error) {
    console.error("Error editing cliente: ", error);
    throw error;
  }
}

export async function borrarCliente(id: number) {
  try {
    const response = await fetch("http://localhost:8080/clients/" + id, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting client");
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.error("Error deleting client: ", error);
    throw error;
  }
}
