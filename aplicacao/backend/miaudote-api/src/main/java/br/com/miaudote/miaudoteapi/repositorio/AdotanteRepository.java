package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdotanteRepository extends JpaRepository<Adotante, Integer> {

    Adotante findByEmailAndSenha(String email, String senha);

}