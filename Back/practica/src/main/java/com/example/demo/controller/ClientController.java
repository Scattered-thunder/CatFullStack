package com.example.demo.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Client;
import com.example.demo.entity.dto.ClientRequest;
import com.example.demo.exceptions.ClientAlreadyExistsException;
import com.example.demo.exceptions.ClientNotFoundException;
import com.example.demo.service.ClientService;

@RestController
@RequestMapping("clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public ResponseEntity<List<Client>> getClients() {
        return ResponseEntity.ok(clientService.getClients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) throws ClientNotFoundException {
        Optional<Client> result = clientService.getClientById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            throw new ClientNotFoundException();
        }
    }

    @PostMapping
    public ResponseEntity<Object> createClient(@RequestBody ClientRequest clientRequest)
            throws ClientAlreadyExistsException {
        Client result = clientService.createClient(
                clientRequest.getName(),
                clientRequest.getSurname(),
                clientRequest.getCountry(),
                clientRequest.getMail());
        return ResponseEntity.created(URI.create("/clients/" + result.getId())).body(result);
    }

    @DeleteMapping("/{Id}")
    public ResponseEntity<Object> deleteClient(@PathVariable Long Id) throws ClientNotFoundException {
        clientService.deleteClient(Id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{Id}")
    public ResponseEntity<Object> updateCLient(@PathVariable Long Id, @RequestBody ClientRequest clientRequest)
            throws ClientNotFoundException {
        clientService.updateClient(Id, clientRequest.getName(), clientRequest.getSurname(), clientRequest.getCountry(),
                clientRequest.getMail());
        return ResponseEntity.noContent().build();
    }
}
