package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Client;
import com.example.demo.exceptions.ClientAlreadyExistsException;
import com.example.demo.exceptions.ClientNotFoundException;
import com.example.demo.repository.ClientRepository;

@Service
public class ClientServiceImp implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClientById(Long Id) throws ClientNotFoundException {
        Optional<Client> result = clientRepository.findById(Id);
        if (result.isEmpty()) {
            throw new ClientNotFoundException();
        } else {
            return clientRepository.findById(Id);
        }
    }

    public Client createClient(String name, String surname, String country, String mail)
            throws ClientAlreadyExistsException {
        List<Client> clients = clientRepository.findByMail(mail);
        if (clients.isEmpty()) {
            return clientRepository.save(new Client(name, surname, country, mail));
        } else {
            throw new ClientAlreadyExistsException();
        }
    }

    public void deleteClient(Long Id) throws ClientNotFoundException {
        Optional<Client> client = clientRepository.findById(Id);
        if (client.isPresent())
            clientRepository.deleteById(Id);
        else
            throw new ClientNotFoundException();
    }

    public void updateClient(Long Id, String name, String surname, String country, String mail)
            throws ClientNotFoundException {
        Optional<Client> clients = clientRepository.findById(Id);
        if (clients.isEmpty()) {
            throw new ClientNotFoundException();
        }
        Client client = clients.get();
        client.setName(name);
        client.setSurname(surname);
        client.setCountry(country);
        client.setMail(mail);
        clientRepository.save(client);
    }

}
