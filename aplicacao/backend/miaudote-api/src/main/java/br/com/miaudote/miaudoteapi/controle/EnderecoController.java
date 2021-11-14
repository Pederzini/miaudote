package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Endereco;
import br.com.miaudote.miaudoteapi.repositorio.EnderecoRepository;
import br.com.miaudote.miaudoteapi.utilitarios.GoogleAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/miaudote/enderecos")
public class EnderecoController {

    @Autowired
    EnderecoRepository enderecoRepository;

    @PatchMapping("/{id}")
    public ResponseEntity atualizaEndereco(
            @PathVariable Integer id,
            @RequestBody Endereco novoEndereco
    ) {
        Endereco endereco = enderecoRepository.findById(id).get();
        endereco.setBairro(novoEndereco.getBairro());
        endereco.setCep(novoEndereco.getCep());
        endereco.setCidade(novoEndereco.getCidade());
        endereco.setComplemento(novoEndereco.getComplemento());
        endereco.setNumero(novoEndereco.getNumero());
        endereco.setLogradouro(novoEndereco.getLogradouro());

        enderecoRepository.save(GoogleAdapter.buscarLatAndLong(endereco));
        return ResponseEntity.status(200).build();
    }

}