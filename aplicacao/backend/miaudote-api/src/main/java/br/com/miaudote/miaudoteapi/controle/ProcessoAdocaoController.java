package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.ProcessoAdocao;
import br.com.miaudote.miaudoteapi.dto.*;
import br.com.miaudote.miaudoteapi.repositorio.AdotanteRepository;
import br.com.miaudote.miaudoteapi.repositorio.AnimalRepository;
import br.com.miaudote.miaudoteapi.repositorio.ProcessoAdocaoRepository;
import br.com.miaudote.miaudoteapi.utilitarios.DataHora;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/miaudote/adocoes")
public class ProcessoAdocaoController {

    @Autowired
    private AdotanteRepository adotanteRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private ProcessoAdocaoRepository processoAdocaoRepository;

    @GetMapping("/feedbacks")
    public ResponseEntity getFeedbacksAdotantes() {
        List<FeedbackDTO> feedbacks = processoAdocaoRepository.findByFeedbackNotNullAndDataAdocaoNotNull();

        Collections.shuffle(feedbacks);

        if (feedbacks.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(feedbacks);
    }

    @GetMapping("/{cnpj}/animais-favoritados")
    public ResponseEntity getAnimaisFavoritados(@PathVariable String cnpj) {
        List<AnimalFavoritadoDTO> animaisFavoritados = processoAdocaoRepository.encontrarAnimaisFavoritados(cnpj);

        if (animaisFavoritados.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(animaisFavoritados);
    }

    @GetMapping("/{id}/pessoas-que-favoritaram")
    public ResponseEntity getPessoasQueFavoritaram(@PathVariable Integer id) {
        List<AdotanteQueFavoritouDTO> processosAdocao = processoAdocaoRepository.findByAnimalId(id);

        if (processosAdocao.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(processosAdocao);
    }

    @GetMapping("/{cnpj}/adocoes-em-processo")
    public ResponseEntity getEmProcesso(@PathVariable String cnpj) {
        List<AdocaoEmProcessoDTO> adocoesEmProcesso = processoAdocaoRepository.findByDataAdocaoIsNullAndDataInicioProcessoNotNull();

        adocoesEmProcesso.removeIf(adocao -> !adocao.getAnimal().getOng().getCnpj().equals(cnpj));

        if (adocoesEmProcesso.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(adocoesEmProcesso);
    }

    @GetMapping("/{cnpj}/adocoes-concluidas")
    public ResponseEntity getAdocoesConcluidas(@PathVariable String cnpj) {
        List<AdocaoFinalizadaDTO> adocoesConcluidas = processoAdocaoRepository.findByDataAdocaoNotNull();

        adocoesConcluidas.removeIf(adocao -> !adocao.getAnimal().getOng().getCnpj().equals(cnpj));

        if (adocoesConcluidas.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(adocoesConcluidas);
    }

    @GetMapping("/{id}/informacoes-pessoa-que-favoritou")
    public ResponseEntity getInformacoesPessoaQueFavoritou(@PathVariable Integer id) {
        AdotanteDTO adotante = adotanteRepository.findByIdEquals(id);

        return ResponseEntity.status(200).body(adotante);
    }

    @PatchMapping("/finaliza-adocao/{id}")
    public ResponseEntity finalizaProcessoAdocao(@PathVariable Integer id) {
        ProcessoAdocao processoAdocao = processoAdocaoRepository.findById(id).get();
        processoAdocao.setDataAdocao(DataHora.retornaDataHoraAtual());

        processoAdocaoRepository.save(processoAdocao);

        return ResponseEntity.status(200).build();
    }

    @PatchMapping("/cancela-adocao/{id}")
    public ResponseEntity cancelaProcessoAdocao(@PathVariable Integer id) {
        ProcessoAdocao processoAdocao = processoAdocaoRepository.findById(id).get();
        processoAdocao.setDataInicioProcesso(null);
        processoAdocao.setModoContato(null);
        processoAdocao.setFeedback(null);
        processoAdocao.setAvaliacaoSite(null);

        processoAdocaoRepository.save(processoAdocao);

        return ResponseEntity.status(200).build();
    }

}