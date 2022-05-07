package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.ProcessoAdocao;
import br.com.miaudote.miaudoteapi.dto.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProcessoAdocaoRepository extends JpaRepository<ProcessoAdocao, Integer> {

    List<FeedbackDTO> findByFeedbackNotNullAndDataAdocaoNotNull();

    @Query(value = "SELECT animal.id_animal AS idAnimal, animal.nome, FLOOR((CAST (GetDate() AS DECIMAL) - CAST(animal.data_nascimento AS DECIMAL)) / 365.25) as idadeAnimal, animal.genero, animal.url_imagem AS url, processo.favoritado, COUNT(processo.favoritado) AS numFavoritado " +
            "FROM Processo_Adocao AS processo " +
            "INNER JOIN Animal AS animal ON fk_animal = id_animal " +
            "INNER JOIN Ong AS ong ON fk_ong = id_ong " +
            "WHERE animal.adotado = 0 " +
            "AND processo.favoritado = 1 " +
            "AND ong.cnpj = ?1 " +
            "GROUP BY id_animal, animal.nome, animal.data_nascimento, animal.genero, animal.url_imagem, processo.favoritado", nativeQuery = true)
    List<AnimalFavoritadoDTO> encontrarAnimaisFavoritados(String cnpj);

    List<AdotanteQueFavoritouDTO> findByAnimalId(Integer idAnimal);

    List<AdocaoEmProcessoDTO> findByDataAdocaoIsNullAndDataInicioProcessoNotNull();

    List<AdocaoFinalizadaDTO> findByDataAdocaoNotNull();

    ProcessoAdocao findByAdotanteIdAndAnimalId(Integer idAdotante, Integer idAnimal);

    ProcessoAdocao findByAnimalIdAndAdotanteIdAndDataInicioProcessoNotNull(Integer idAnimal, Integer idAdotante);

    PerfilAnimalDTO findByAnimalIdAndAdotanteIdAndFavoritadoTrue(Integer idAnimal, Integer idAdotante);

    PerfilAnimalComOngDTO findByAnimalIdEqualsAndAdotanteIdAndFavoritadoTrue(Integer idAnimal, Integer idAdotante);

    List<PerfilAnimalDTO> findByFavoritadoIsTrueAndAdotante_Id(Integer idAdotante);

    List<AnimaisAdotadosDTO> findByAdotante_IdAndDataAdocaoNotNull(Integer id);

    List<InfosAdotanteDTO> findByAdotante_IdAndAnimal_AdotadoFalse(Integer idAdotante);

}