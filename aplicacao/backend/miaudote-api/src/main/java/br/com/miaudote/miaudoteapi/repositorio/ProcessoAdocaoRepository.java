package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.ProcessoAdocao;
import br.com.miaudote.miaudoteapi.dto.AdocaoEmProcessoDTO;
import br.com.miaudote.miaudoteapi.dto.AdotantesQueFavoritaramDTO;
import br.com.miaudote.miaudoteapi.dto.AnimaisFavoritadosDTO;
import br.com.miaudote.miaudoteapi.dto.FeedbackDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProcessoAdocaoRepository extends JpaRepository<ProcessoAdocao, Integer> {

    @Query(value = "SELECT adotante.nome, processo.avaliacao_site AS avaliacao, processo.feedback, adotante.url_imagem AS url " +
            "FROM Processo_Adocao AS processo inner join Adotante AS adotante " +
            "ON fk_adotante = id_adotante " +
            "WHERE datalength(feedback) > 0", nativeQuery = true)
    List<FeedbackDTO> findByFeedbackNotNull();

    @Query(value = "SELECT animal.id_animal AS idAnimal, animal.nome, FLOOR((CAST (GetDate() AS DECIMAL) - CAST(animal.data_nascimento AS DECIMAL)) / 365.25) as idadeAnimal, animal.genero, animal.url_imagem AS url, processo.favoritado, COUNT(processo.favoritado) AS numFavoritado " +
            "FROM Processo_Adocao AS processo INNER JOIN Animal AS animal " +
            "ON fk_animal = id_animal " +
            "WHERE animal.adotado = 0 " +
            "AND processo.favoritado = 1 " +
            "GROUP BY id_animal, animal.nome, animal.data_nascimento, animal.genero, animal.url_imagem, processo.favoritado", nativeQuery = true)
    List<AnimaisFavoritadosDTO> encontrarAnimaisFavoritados();

    List<AdotantesQueFavoritaramDTO> findByAnimalId(Integer idAnimal);

    List<AdocaoEmProcessoDTO> findByModoContatoNotNull();

}