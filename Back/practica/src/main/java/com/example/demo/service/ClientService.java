package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Client;
import com.example.demo.exceptions.ClientAlreadyExistsException;
import com.example.demo.exceptions.ClientNotFoundException;

public interface ClientService {

        public List<Client> getClients();

        public Optional<Client> getClientById(Long Id) throws ClientNotFoundException;

        public Client createClient(String name, String surname, String country, String mail)
                        throws ClientAlreadyExistsException;

        public void deleteClient(Long Id) throws ClientNotFoundException;

        public void updateClient(Long Id, String name, String surname, String country, String mail)
                        throws ClientNotFoundException;

}
