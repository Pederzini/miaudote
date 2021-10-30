package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.Animal;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AnimalRepository extends JpaRepository<Animal, Integer> {

    List<Animal> findByOng(Ong ongForeignKey);

    @Query(value = "select top 6 * from Animal order by newid()", nativeQuery = true)
    List<Animal> findRandomTop6();

    Integer countByAdotadoTrue();

    Integer countByAdotadoTrueAndOngId(Integer idOng);

}
