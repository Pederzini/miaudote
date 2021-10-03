package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Endereco;
import br.com.miaudote.miaudoteapi.repositorio.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/miaudote/endereco")
public class EnderecoController {

    @Autowired
    private EnderecoRepository enderecoRepository;


    @PostMapping
    public ResponseEntity cadastrarEndereco(@RequestBody Endereco endereco){
        enderecoRepository.save(endereco);
        return ResponseEntity.status(201).build();
    }
}
