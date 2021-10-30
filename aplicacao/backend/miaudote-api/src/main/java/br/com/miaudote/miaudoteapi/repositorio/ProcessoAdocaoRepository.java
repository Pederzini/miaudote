package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.ProcessoAdocao;
import br.com.miaudote.miaudoteapi.dto.FeedbackDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProcessoAdocaoRepository extends JpaRepository<ProcessoAdocao, Integer> {

    @Query(value = "select adotante.nome, processo.avaliacao_site, processo.feedback, adotante.url_imagem " +
            "from Processo_Adocao as processo inner join Adotante as adotante " +
            "on fk_adotante = id_adotante " +
            "where datalength(feedback) > 0", nativeQuery = true)
    List<FeedbackDTO> findByFeedbackNotNull();

}
