package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.Animal;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.dto.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Integer> {

    List<Animal> findByOng(Ong ongForeignKey);

    @Query(value = "SELECT TOP 3 animal.nome, FLOOR((CAST (GetDate() AS DECIMAL) - CAST(animal.data_nascimento AS DECIMAL)) / 365.25) as idadeAnimal, " +
            "animal.url_imagem AS url, animal.descricao, animal.id_animal AS id, animal.especie " +
            "FROM Animal ORDER BY NEWID()", nativeQuery = true)
    List<AnimalVitrineDTO> findRandomTop3();

    Integer countByAdotadoTrue();
    List<Animal> findByAdotadoFalseAndOngId(Integer idOng);
    Integer countByAdotadoTrueAndOngId(Integer idOng);

    List<CardAnimalSemDistanciaDTO> findByAdotadoFalse();

    @Query(value = "SELECT animal.nome, FLOOR((CAST (GetDate() AS DECIMAL) - CAST(animal.data_nascimento AS DECIMAL)) / 365.25) as idadeAnimal, " +
            "animal.url_imagem AS url, animal.descricao, animal.id_animal AS id, animal.especie, animal.genero, animal.data_chegada AS dataChegada, " +
            "animal.cor_pelagem AS corPelagem, animal.tipo_pelagem AS tipoPelagem, animal.castrado, animal.vacinado, animal.adotado, " +
            "animal.porte, animal.comportamento, animal.necessidade_especiais as necessidadeEspeciais, ong.id_ong as id_ong " +
            "FROM Animal INNER JOIN ong on fk_ong = id_ong WHERE ong.id_ong = ?1 ORDER BY adotado, data_chegada", nativeQuery = true)
    List<CardAnimalOngDTO> findByOngId(Integer idOng);
}