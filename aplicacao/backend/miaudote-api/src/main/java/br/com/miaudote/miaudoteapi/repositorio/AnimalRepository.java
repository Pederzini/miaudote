package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.Animal;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.dto.AnimalVitrineDTO;
import br.com.miaudote.miaudoteapi.dto.CardAnimalSemDistanciaDTO;
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

    Integer countByAdotadoTrueAndOngId(Integer idOng);

    List<CardAnimalSemDistanciaDTO> findByAdotadoFalse();

}