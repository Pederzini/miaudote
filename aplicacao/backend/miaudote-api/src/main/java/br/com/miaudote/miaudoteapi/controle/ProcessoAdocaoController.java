package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dto.AnimaisFavoritadosDTO;
import br.com.miaudote.miaudoteapi.dto.FeedbackDTO;
import br.com.miaudote.miaudoteapi.repositorio.AdotanteRepository;
import br.com.miaudote.miaudoteapi.repositorio.AnimalRepository;
import br.com.miaudote.miaudoteapi.repositorio.ProcessoAdocaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}