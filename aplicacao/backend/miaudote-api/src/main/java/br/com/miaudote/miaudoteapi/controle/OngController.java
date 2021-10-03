package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/miaudote/ong")
public class OngController {

    @Autowired
    private OngRepository ongRepository;

    @PostMapping
    public ResponseEntity cadastroAdotante(@RequestBody Ong ongCad){
        ongRepository.save(ongCad);
        return ResponseEntity.status(201).build();
    }
}
