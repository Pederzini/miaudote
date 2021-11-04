package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.repositorio.AnimalRepository;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
import br.com.miaudote.miaudoteapi.utilitarios.AnalisaException;
import br.com.miaudote.miaudoteapi.utilitarios.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/miaudote/ong")
public class OngController {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private OngRepository ongRepository;

    @PostMapping
    public ResponseEntity cadastroOng(@RequestBody Ong ongCad) {
        try {
            GoogleAdapter googleAdapter = new GoogleAdapter();
            ongCad = (Ong) googleAdapter.registrarLatAndLong(ongCad);
            ongRepository.save(ongCad);
        } catch (DataIntegrityViolationException erro) {
            return ResponseEntity.status(409).body(AnalisaException.analisaErroCadastroOng(erro));
        }

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

    @GetMapping("/{id}")
    public ResponseEntity getOng(@PathVariable Integer id) {
        return ResponseEntity.of(ongRepository.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity putOng(
            @PathVariable Integer id,
            @RequestBody Ong ongAlterada
    ) {
        if (ongRepository.existsById(id)) {
            ongAlterada.setIdOng(id);
            ongRepository.save(ongAlterada);
            return ResponseEntity.status(200).build();
        }

        return ResponseEntity.status(404).build();
    }

    @GetMapping("/{cnpj}/numero-adotados")
    public ResponseEntity getAdotados(@PathVariable String cnpj) {
        Integer idOng = ongRepository.findByCnpj(cnpj).getIdOng();
        Integer numeroAdotados = animalRepository.countByAdotadoTrueAndOngId(idOng);

        return ResponseEntity.status(200).body(numeroAdotados);
    }

}