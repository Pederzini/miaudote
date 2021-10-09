package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import br.com.miaudote.miaudoteapi.dominio.Animal;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.repositorio.AnimalRepository;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;


// FAZER OS ENDPOINTS
@RestController
@RequestMapping("/miaudote/animal")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
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

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAnimal(@PathVariable int id) {

        if (animalRepository.existsById(id)) {
            animalRepository.delete(animalRepository.getById(id));
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(404).build();
    }
    
    @PostMapping
    public ResponseEntity cadastroAnimal(@RequestBody Animal animalCad) {
        animalRepository.save(animalCad);
        return ResponseEntity.status(201).body(animalCad);
    }

    @PutMapping("/{cnpj}/{idAnimal}")
    public ResponseEntity atribuiOng(@PathVariable String cnpj, @PathVariable int idAnimal) {
        Animal animal = animalRepository.findById(idAnimal).get();
        Ong ong = ongRepository.findByCnpj(cnpj);
        animal.setOng(ong);
        animalRepository.save(animal);
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



}