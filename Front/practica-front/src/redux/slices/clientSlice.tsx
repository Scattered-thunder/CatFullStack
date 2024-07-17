import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "../../models/Client";
import { RootState } from "../store";

export interface ClientState {
  clients: Client[];
}

const initialState: ClientState = {
  clients: [], // Starts with an empty array
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<Client[]>) => {
      state.clients = action.payload;
    },
    addClient: (state, action: PayloadAction<Client>) => {
      state.clients.push(action.payload);
    },
    deleteClient: (state, action: PayloadAction<string>) => {
      state.clients = state.clients.filter((client) => client.mail !== action.payload);
    },
    updateClient: (state, action: PayloadAction<Client>) => {
      const index = state.clients.findIndex(
        (client) => client.mail === action.payload.mail
      );
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
    },
    addClients: (state, action: PayloadAction<Client[]>) => {
      const uniqueClients = action.payload.filter(
        (uniqueClient) =>
          !state.clients.some(
            (existingClient) => existingClient.mail == uniqueClient.mail
          )
      );
      state.clients.push(...uniqueClients);
    },
  },
});

export const { addClient, deleteClient, updateClient, addClients, setClients } =
  clientSlice.actions;

export default clientSlice.reducer;
export const selectClients = (state: RootState) => state.client.clients;
