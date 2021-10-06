package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import br.com.miaudote.miaudoteapi.dominio.Login;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/miaudote/ong")
public class OngController {

    @Autowired
    private OngRepository ongRepository;

    @PostMapping
    public ResponseEntity cadastroOng(@RequestBody Ong ongCad) {
        ongRepository.save(ongCad);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/login")
    public ResponseEntity loginOng(@RequestBody Login login) {
        Ong ong = ongRepository.findByEmailAndSenha(login.getEmail(), login.getSenha());

        if (ong == null) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(200).body(ong);
    }

    @GetMapping
    public ResponseEntity getOngs() {
        List<Ong> ongs = ongRepository.findAll();

        if (ongs.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(ongs);
    }

}
