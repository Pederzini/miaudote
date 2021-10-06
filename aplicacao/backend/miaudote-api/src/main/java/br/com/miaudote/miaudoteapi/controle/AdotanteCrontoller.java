package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import br.com.miaudote.miaudoteapi.dominio.Login;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.repositorio.AdotanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/miaudote/adotante")
public class AdotanteCrontoller {

    @Autowired
    private AdotanteRepository adotanteRepository;

    @PostMapping
    public ResponseEntity cadastroAdotante(@RequestBody Adotante adotanteCad) {
        adotanteRepository.save(adotanteCad);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/login")
    public ResponseEntity loginAdotante(@RequestBody Login login) {
        Adotante adotante = adotanteRepository.findByEmailAndSenha(login.getEmail(), login.getSenha());

        if (adotante == null) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(200).body(adotante);
    }

    @GetMapping
    public ResponseEntity getAdotantes() {
        List<Adotante> adotantes = adotanteRepository.findAll();

        if (adotantes.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(adotantes);
    }

}
