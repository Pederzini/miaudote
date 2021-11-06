package br.com.miaudote.miaudoteapi.repositorio;

import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.dto.OngMapaDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OngRepository extends JpaRepository<Ong, Integer> {

    Ong findByEmailAndSenha(String email, String senha);

    Ong findByCnpj(String cnpj);

    @Query(value = "SELECT razao_social as razaoSocial, telefone, url_imagem as urlImagem, logradouro, numero, cep, latitude, longitude, cidade " +
            "FROM Ong INNER JOIN Endereco " +
            "ON fk_endereco = id_endereco", nativeQuery = true)
    List<OngMapaDTO> encontrarTodasAsOngs();
}