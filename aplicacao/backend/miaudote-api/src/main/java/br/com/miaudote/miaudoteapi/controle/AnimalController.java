package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Animal;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.dto.AnimalVitrineDTO;
import br.com.miaudote.miaudoteapi.dto.PerfilAnimalDTO;
import br.com.miaudote.miaudoteapi.exportacao.Exportacao;
import br.com.miaudote.miaudoteapi.exportacao.ListaObj;
import br.com.miaudote.miaudoteapi.repositorio.AnimalRepository;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
import br.com.miaudote.miaudoteapi.repositorio.ProcessoAdocaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/miaudote/animais")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private OngRepository ongRepository;

    @Autowired
    private ProcessoAdocaoRepository processoAdocaoRepository;

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
            animalRepository.getById(id).setOng(null);
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

    @GetMapping(value = "/relatorio/{cnpj}", produces = "text/csv")
    public ResponseEntity geraRelatorio(@PathVariable String cnpj) {
        Ong ong = ongRepository.findByCnpj(cnpj);
        List<Animal> animais = animalRepository.findByOng(ong);
        ListaObj<Animal> listaObj = new ListaObj(animais.size());

        for (Animal animal : animais) {
            listaObj.adiciona(animal);
        }

        String relatorio = Exportacao.gravaArquivoCsv(listaObj, ong.getRazaoSocial());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", String.format("attachment; filename = %s.csv", ong.getRazaoSocial()));

        return new ResponseEntity(relatorio, headers, HttpStatus.OK);
    }

    @GetMapping("/vitrine")
    public ResponseEntity getAnimaisVitrine() {
        List<AnimalVitrineDTO> animais = animalRepository.findRandomTop3();

        if (animais.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(animais);
    }

    @GetMapping("/numero-adotados")
    public ResponseEntity getNumeroAnimaisAdotados() {
        Integer numeroAdotados = animalRepository.countByAdotadoTrue();

        return ResponseEntity.status(200).body(numeroAdotados);
    }

    @GetMapping("/perfil-animal/{idAnimal}/{idAdotante}")
    public ResponseEntity getPerfilAnimal(
            @PathVariable Integer idAdotante,
            @PathVariable Integer idAnimal
    ) {
        PerfilAnimalDTO animal = processoAdocaoRepository.findByAnimalIdAndAdotanteIdAndFavoritadoTrue(idAnimal, idAdotante);

        if (animal != null) {
            return ResponseEntity.status(200).body(animal);
        }

        return getAnimal(idAnimal);
    }
}