package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdotanteRepository extends JpaRepository<Adotante, Integer> {

    @Query("SELECT a FROM Adotante a WHERE a.email = :email AND a.senha = :senha")
    List<Adotante> validarLoginOng(@Param("email") String email,
                         @Param("senha") String senha);
}
