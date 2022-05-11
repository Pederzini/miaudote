package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Animal;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.dto.*;
import br.com.miaudote.miaudoteapi.repositorio.AnimalRepository;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
import br.com.miaudote.miaudoteapi.repositorio.ProcessoAdocaoRepository;
import br.com.miaudote.miaudoteapi.utilitarios.FilaObj;
import br.com.miaudote.miaudoteapi.utilitarios.ManipulaArquivo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
        if (animalRepository.existsById(id)) {
            Animal animal = animalRepository.findById(id).get();
            AnimalDTO animalRetorno = new AnimalDTO(animal.getNome(),
                    animal.getDescricao(),
                    animal.getDataNascimento(),
                    animal.getGenero(),
                    animal.getDataChegada(),
                    animal.getCorPelagem(),
                    animal.getCastrado(),
                    animal.getPorte(),
                    animal.getTipoPelagem(),
                    animal.getVacinado(),
                    animal.getComportamento(),
                    animal.getAdotado(),
                    animal.getNecessidadeEspeciais(),
                    animal.getUrlImagem(),
                    animal.getEspecie());
            return ResponseEntity.status(200).body(animalRetorno);
        }
        return ResponseEntity.status(404).build();
    }

    @GetMapping
    public ResponseEntity getAnimais() {
        List<Animal> animal = animalRepository.findAll();

        if (animal.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(animal);
    }

    @GetMapping("/animais-ong/{cnpj}")
    public ResponseEntity getAnimaisOng(@PathVariable String cnpj) {
        Ong ong = ongRepository.findByCnpj(cnpj);

        List<CardAnimalOngDTO> animais = animalRepository.findByOngId(ong.getIdOng());

        if (animais.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        FilaObj<CardAnimalOngDTO> filaAnimal = new FilaObj<>(animais.size());

        for (CardAnimalOngDTO animal : animais) {
            filaAnimal.insert(animal);
        }

        animais.clear();

        while (!filaAnimal.isEmpty()) {
            animais.add(filaAnimal.poll());
        }

        return ResponseEntity.status(200).body(animais);

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
    public ResponseEntity<Animal> cadastroAnimal(@RequestBody Animal animalCad) {
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
            Animal animalOriginal = animalRepository.getById(id);
            Ong ong = animalOriginal.getOng();
            animalAlterado.setOng(ong);
            animalRepository.save(animalAlterado);
            return ResponseEntity.status(200).build();
        }

        return ResponseEntity.status(404).build();
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
    public ResponseEntity<Integer> getNumeroAnimaisAdotados() {
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

    @GetMapping("/perfil-animal-com-ong/{idAnimal}/{idAdotante}")
    public ResponseEntity getPerfilAnimalComOng(
            @PathVariable Integer idAdotante,
            @PathVariable Integer idAnimal
    ) {
        Boolean favoritado = false;

        PerfilAnimalComOngDTO animal = processoAdocaoRepository.findByAnimalIdEqualsAndAdotanteIdAndFavoritadoTrue(idAnimal, idAdotante);

        if (animal != null) {
            favoritado = true;
        }

        Animal animalSemOng = animalRepository.findById(idAnimal).get();
        Ong ong = ongRepository.findById(animalSemOng.getOng().getIdOng()).get();
        SimpleDateFormat formatoCerto = new SimpleDateFormat("dd/MM/yyyy");
        String dataFundacao = formatoCerto.format(ong.getDataFundacao());

        PerfilAnimalComOngFavoritoDTO animalComOngSemFavorito = new PerfilAnimalComOngFavoritoDTO(
                animalSemOng.getIdAnimal(),
                animalSemOng.getNome(),
                animalSemOng.getDataNascimento(),
                animalSemOng.getGenero(),
                animalSemOng.getTipoPelagem(),
                animalSemOng.getCorPelagem(),
                animalSemOng.getPorte(),
                animalSemOng.getDataChegada(),
                animalSemOng.getComportamento(),
                animalSemOng.getCastrado(),
                animalSemOng.getVacinado(),
                animalSemOng.getUrlImagem(),
                animalSemOng.getDescricao(),
                animalSemOng.getNecessidadeEspeciais(),
                animalSemOng.getEspecie(),
                favoritado,
                new InfosOng(
                        ong.getIdOng(),
                        ong.getRazaoSocial(),
                        ong.getUrlImagem(),
                        dataFundacao,
                        ong.getTelefone(),
                        ong.getEmail(),
                        ong.getNomeResponsavel(),
                        new InfosEndereco(
                                ong.getEndereco().getLogradouro(),
                                ong.getEndereco().getNumero(),
                                ong.getEndereco().getBairro(),
                                ong.getEndereco().getCep(),
                                ong.getEndereco().getCidade()
                        )
                )
        );

        return ResponseEntity.status(200).body(animalComOngSemFavorito);
    }

    @GetMapping("/{id}/cards")
    public ResponseEntity getNaoAdotados(@PathVariable Integer id) {
        List<CardAnimalSemDistanciaDTO> animais = animalRepository.findByAdotadoFalse();
        List<InfosAdotanteDTO> infosAdotante = processoAdocaoRepository.findByAdotante_IdAndAnimal_AdotadoFalse(id);
        List<CardAnimalComDistanciaDTO> cards = new ArrayList<>();
        List<Integer> idsFavoritados = new ArrayList<>();

        for (InfosAdotanteDTO info : infosAdotante) {
            if (info.getFavoritado()) {
                idsFavoritados.add(info.getAnimal().getId());
            }
        }

        for (CardAnimalSemDistanciaDTO animal : animais) {
            cards.add(
                    new CardAnimalComDistanciaDTO(
                            idsFavoritados.contains(animal.getId()),
                            animal.getId(),
                            animal.getNome(),
                            animal.getDataNascimento(),
                            animal.getUrlImagem(),
                            animal.getEspecie(),
                            animal.getDescricao(),
                            animal.getOng().getEndereco().getLatitude(),
                            animal.getOng().getEndereco().getLongitude(),
                            infosAdotante.get(0).getAdotante().getEndereco().getLatitude(),
                            infosAdotante.get(0).getAdotante().getEndereco().getLongitude(),
                            animal.getDataChegada(),
                            animal.getCastrado(),
                            animal.getPorte(),
                            animal.getTipoPelagem(),
                            animal.getCorPelagem(),
                            animal.getVacinado(),
                            animal.getComportamento(),
                            animal.getAdotado(),
                            animal.getNecessidadeEspeciais()
                    )
            );
        }

        if (cards.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(cards);
    }

    @GetMapping(value = "/exportacao/{cnpj}", produces = "text/plain")
    public ResponseEntity<String> geraDocumento(@PathVariable String cnpj) {
        Ong ong = ongRepository.findByCnpj(cnpj);
        List<Animal> animais = animalRepository.findByOng(ong);
        String relatorio = ManipulaArquivo.gravarArquivoTxt(animais, ong);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", String.format("attachment; filename = %s-miaudote.txt", ong.getRazaoSocial()));

        return new ResponseEntity<>(relatorio, headers, HttpStatus.OK);
    }

    @PostMapping("/importacao/{cnpj}")
    public ResponseEntity importaDocumento(@PathVariable String cnpj,
                                           @RequestParam MultipartFile arquivo) throws IOException {
        String conteudo = new String(arquivo.getBytes());
        List<Animal> animais = null;
        try {
            animais = ManipulaArquivo.leArquivo(conteudo);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if (animais == null) {
            return ResponseEntity.status(204).build();
        }
        for (Animal a : animais) {
            animalRepository.save(a);
            atribuiOng(cnpj, animalRepository.findById(a.getIdAnimal()).get().getIdAnimal());
        }

        return ResponseEntity.status(201).body(animais);
    }
}