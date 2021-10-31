package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.ProcessoAdocao;
import br.com.miaudote.miaudoteapi.dto.AnimaisFavoritadosDTO;
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

    @Query(value = "SELECT animal.id_animal, animal.nome, FLOOR((CAST (GetDate() AS DECIMAL) - CAST(animal.data_nascimento AS DECIMAL)) / 365.25) as idadeAnimal, animal.genero, animal.url_imagem, processo.favoritado, COUNT(processo.favoritado) AS numFavoritado " +
            "FROM Processo_Adocao AS processo INNER JOIN Animal AS animal " +
            "ON fk_animal = id_animal " +
            "WHERE animal.adotado = 0 " +
            "AND processo.favoritado = 1 " +
            "GROUP BY id_animal, animal.nome, animal.data_nascimento, animal.genero, animal.url_imagem, processo.favoritado", nativeQuery = true)
    List<AnimaisFavoritadosDTO> encontrarAnimaisFavoritados();

}
