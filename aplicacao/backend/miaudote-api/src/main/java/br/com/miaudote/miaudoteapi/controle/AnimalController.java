package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import br.com.miaudote.miaudoteapi.dominio.Animal;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.repositorio.AnimalRepository;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


// FAZER OS ENDPOINTS
@RestController
@RequestMapping("/miaudote/animal")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;
    private OngRepository ongRepository;

    @GetMapping("/{id}")
    public ResponseEntity getAnimal(@PathVariable Integer id) {
        return ResponseEntity.of(animalRepository.findById(id));
    }

    @GetMapping
    public ResponseEntity getAnimal() {
        List<Animal> animal = animalRepository.findAll();

        if (animal.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(animal);
    }

    @PostMapping("/{email}")
    public ResponseEntity cadastroAnimal(@RequestBody Animal animalCad,@PathVariable String cnpj) {
        Ong ong = ongRepository.findByEmail(cnpj);
        animalCad.setOng(ong);
        animalRepository.save(animalCad);

        return ResponseEntity.status(201).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity putAnimal(
            @PathVariable Integer id,
            @RequestBody Animal animalAlterado
    ) {
        if (animalRepository.existsById(id)) {
            animalAlterado.setIdAnimal(id);
            animalRepository.save(animalAlterado);
            return ResponseEntity.status(200).build();
        }

        return ResponseEntity.status(404).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAnimal(@PathVariable int id) {

        if (animalRepository.existsById(id)) {
            animalRepository.delete(animalRepository.getById(id));
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(404).build();
    }

}