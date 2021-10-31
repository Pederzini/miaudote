package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import br.com.miaudote.miaudoteapi.dominio.ProcessoAdocao;
import br.com.miaudote.miaudoteapi.dto.AdocaoEmProcessoDTO;
import br.com.miaudote.miaudoteapi.dto.AdotantesQueFavoritaramDTO;
import br.com.miaudote.miaudoteapi.dto.AnimaisFavoritadosDTO;
import br.com.miaudote.miaudoteapi.dto.FeedbackDTO;
import br.com.miaudote.miaudoteapi.repositorio.AdotanteRepository;
import br.com.miaudote.miaudoteapi.repositorio.AnimalRepository;
import br.com.miaudote.miaudoteapi.repositorio.ProcessoAdocaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/miaudote/adocao")
public class ProcessoAdocaoController {

    @Autowired
    private AdotanteRepository adotanteRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private ProcessoAdocaoRepository processoAdocaoRepository;

    @GetMapping("/feedbacks")
    public ResponseEntity getFeedbacksAdotantes() {
        List<FeedbackDTO> feedbacks = processoAdocaoRepository.findByFeedbackNotNull();

        if(feedbacks.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(feedbacks);
    }

    @GetMapping("/animais-favoritados")
    public ResponseEntity getAnimaisFavoritados() {
        List<AnimaisFavoritadosDTO> animaisFavoritados = processoAdocaoRepository.encontrarAnimaisFavoritados();

        if(animaisFavoritados.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(animaisFavoritados);
    }

    @GetMapping("/{id}/pessoas-que-favoritaram")
    public ResponseEntity getPessoasQueFavoritaram(@PathVariable Integer id) {
        List<AdotantesQueFavoritaramDTO> processosAdocao = processoAdocaoRepository.findByAnimalId(id);

        if(processosAdocao.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(processosAdocao);
    }

    @GetMapping("/adocoes-em-processo")
    public ResponseEntity getEmProcesso() {
        List<AdocaoEmProcessoDTO> adocoesEmProcesso = processoAdocaoRepository.findByModoContatoNotNull();

        return ResponseEntity.status(200).body(adocoesEmProcesso);
    }
}