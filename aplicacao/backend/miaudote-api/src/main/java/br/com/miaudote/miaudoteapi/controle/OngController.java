package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Animal;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.dto.*;
import br.com.miaudote.miaudoteapi.repositorio.AnimalRepository;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
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
@RequestMapping("/miaudote/ongs")
public class OngController {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private OngRepository ongRepository;

    @PostMapping
    public ResponseEntity cadastroOng(@RequestBody Ong ongCad) {
        try {
            ongCad = (Ong) GoogleAdapter.registrarLatAndLong(ongCad);
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

    @PatchMapping("/{id}")
    public ResponseEntity patchOng(
            @PathVariable Integer id,
            @RequestBody OngSemEnderecoDTO ongNova
    ) {
        ongRepository.updateOng(
                id,
                ongNova.getNomeResponsavel(),
                ongNova.getRazaoSocial(),
                ongNova.getDataFundacao(),
                ongNova.getCnpj(),
                ongNova.getTelefone(),
                ongNova.getEmail(),
                ongNova.getSenha(),
                ongNova.getUrlImagem()
        );

        return ResponseEntity.status(200).build();
    }

    @GetMapping("/{cnpj}/numero-adotados")
    public ResponseEntity getAdotados(@PathVariable String cnpj) {
        Integer idOng = ongRepository.findByCnpj(cnpj).getIdOng();
        Integer numeroAdotados = animalRepository.countByAdotadoTrueAndOngId(idOng);

        return ResponseEntity.status(200).body(numeroAdotados);
    }

/*    @GetMapping("/{cnpj}/numero-nao-adotados")
    public ResponseEntity getAdotadosTipoERestante(@PathVariable String cnpj) {
        Integer idOng = ongRepository.findByCnpj(cnpj).getIdOng();
        Ong ong = ongRepository.findByCnpj(cnpj);
        Integer numeroAdotados = animalRepository.countByAdotadoTrueAndOngId(idOng);
        List<Animal> animaisOng = animalRepository.findByOng(ong);
        Integer totalRestante = numeroAdotados - animaisOng.size();
        animaisOng.removeIf(gatos -> !gatos.getAdotado().equals("True"));
        animaisOng.removeIf(gatos -> gatos.getEspecie().equals("Cachorro"));
        Integer quantidadeGatos = animaisOng.size();

        return ResponseEntity.status(200).body(numeroAdotados);
    }*/


    @GetMapping("/{cnpj}/numero-nao-adotados")
    public ResponseEntity getAdotadosTipoERestante(@PathVariable String cnpj) {
        Integer idOng = ongRepository.findByCnpj(cnpj).getIdOng();
        Ong ong = ongRepository.findByCnpj(cnpj);
        Integer numeroAdotados = animalRepository.countByAdotadoTrueAndOngId(idOng);
        List<Animal> animaisDisponiveis = animalRepository.findByAdotadoFalseAndOngId(idOng);
        Integer numGatos = 0;
        Integer numCachorros = 0;

        for (Animal animal : animaisDisponiveis) {
            if(animal.getEspecie().equals("Cachorro")){
                numCachorros++;
            }else{
                numGatos++;
            }
        }
        AnimaisDisponiveisDTO animaisDisponiveisDTO = new AnimaisDisponiveisDTO(
                animaisDisponiveis.size(),
                numGatos,
                numCachorros,
                numeroAdotados
        );

        return ResponseEntity.status(200).body(animaisDisponiveisDTO);
    }



    @GetMapping("/informacoes-ongs-mapa")
    public ResponseEntity getOngsMapa() {
        List<OngMapaDTO> ongs = ongRepository.encontrarTodasAsOngs();

        if (ongs.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(ongs);
    }

    @GetMapping("/{id}/contato-ong")
    public ResponseEntity getOngsMapa(@PathVariable Integer id) {
        Ong ong = animalRepository.findById(id).get().getOng();
        ContatoOngDTO cardOng = new ContatoOngDTO(
                ong.getIdOng(),
                ong.getRazaoSocial(),
                ong.getDataFundacao(),
                ong.getEndereco().getCidade(),
                ong.getUrlImagem(),
                ong.getEmail(),
                ong.getTelefone()
        );

        return ResponseEntity.status(200).body(cardOng);
    }

}