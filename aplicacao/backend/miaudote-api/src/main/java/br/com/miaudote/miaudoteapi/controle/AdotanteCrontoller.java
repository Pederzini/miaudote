package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import br.com.miaudote.miaudoteapi.repositorio.AdotanteRepository;
import br.com.miaudote.miaudoteapi.utilitarios.AnalisaException;
import br.com.miaudote.miaudoteapi.utilitarios.GoogleAdapter;
import br.com.miaudote.miaudoteapi.utilitarios.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/miaudote/adotantes")
public class AdotanteCrontoller {

    @Autowired
    private AdotanteRepository adotanteRepository;

    @PostMapping
    public ResponseEntity cadastroAdotante(@RequestBody Adotante adotanteCad) {
        try {
            GoogleAdapter googleAdapter = new GoogleAdapter();
            adotanteCad = (Adotante) googleAdapter.registrarLatAndLong(adotanteCad);
            adotanteRepository.save(adotanteCad);
        } catch (DataIntegrityViolationException erro) {
            return ResponseEntity.status(409).body(AnalisaException.analisaErroCadastroAdotante(erro));
        }

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

    @GetMapping("/{id}")
    public ResponseEntity getAdotante(@PathVariable Integer id) {
        return ResponseEntity.of(adotanteRepository.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity putAdotante(
            @PathVariable Integer id,
            @RequestBody Adotante adotanteAlterado) {
        if (adotanteRepository.existsById(id)) {
            adotanteAlterado.setIdAdotante(id);
            adotanteRepository.save(adotanteAlterado);
            return ResponseEntity.status(200).build();
        }


        return ResponseEntity.status(404).build();
    }

}