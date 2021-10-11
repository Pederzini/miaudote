package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.Ong;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OngRepository extends JpaRepository<Ong, Integer> {

    Ong findByEmailAndSenha(String email, String senha);

    Ong findByCnpj(String cnpj);

}
