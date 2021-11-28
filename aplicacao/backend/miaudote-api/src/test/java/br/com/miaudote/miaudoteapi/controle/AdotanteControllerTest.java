package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import br.com.miaudote.miaudoteapi.dominio.Endereco;
import br.com.miaudote.miaudoteapi.repositorio.AdotanteRepository;
import br.com.miaudote.miaudoteapi.utilitarios.AnalisaException;
import br.com.miaudote.miaudoteapi.utilitarios.GoogleAdapter;
import br.com.miaudote.miaudoteapi.utilitarios.Login;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {AdotanteController.class, AdotanteRepository.class, GoogleAdapter.class, AnalisaException.class})
class AdotanteControllerTest {

    @Autowired
    AdotanteController controller;

    @MockBean
    AdotanteRepository repository;

    @Test
    void get_comAdotantes_status200ComCorpo() {
        List<Adotante> adotantesMock = List.of(mock(Adotante.class), mock(Adotante.class));

        when(repository.findAll()).thenReturn(adotantesMock);

        ResponseEntity resposta = controller.getAdotantes();

        assertEquals(200, resposta.getStatusCodeValue());

        assertEquals(adotantesMock, resposta.getBody());
    }

    @Test
    void post_CadastroAdotante_status201SemCorpo() {
        Endereco enderecoMock =
                new Endereco("Rua Haddock Lobo",595,"Prédio Comercial","Consolação","01414-001","São Paulo");
        Adotante adotanteMock = new Adotante("tel", "email", "senha", "url", enderecoMock, "nome", new Date(), "cpf");

        when(repository.save(adotanteMock)).thenReturn(adotanteMock);

        ResponseEntity resposta = controller.cadastroAdotante(adotanteMock);

        assertEquals(201, resposta.getStatusCodeValue());
    }

    @Test
    void post_CadastroAdotantes_status409ComExceptionEmail() {
        Endereco enderecoMock =
                new Endereco("Rua Haddock Lobo",595,"Prédio Comercial","Consolação","01414-001","São Paulo");
        Adotante adotanteMock = new Adotante("tel", "email", "senha", "url", enderecoMock, "nome", new Date(), "cpf");

        when(repository.save(adotanteMock)).thenThrow(new DataIntegrityViolationException("@"));

        ResponseEntity resposta = controller.cadastroAdotante(adotanteMock);

        assertEquals(409, resposta.getStatusCodeValue());
        assertEquals("Email já cadastrado!", resposta.getBody());
    }

    @Test
    void post_Adotantes_status409ComExceptionCPF() {
        Endereco enderecoMock =
                new Endereco("Rua Haddock Lobo",595,"Prédio Comercial","Consolação","01414-001","São Paulo");
        Adotante adotanteMock = new Adotante("tel", "email", "senha", "url", enderecoMock, "nome", new Date(), "cpf");

        when(repository.save(adotanteMock)).thenThrow(new DataIntegrityViolationException(""));

        ResponseEntity resposta = controller.cadastroAdotante(adotanteMock);

        assertEquals(409, resposta.getStatusCodeValue());
        assertEquals("CPF já cadastrado!", resposta.getBody());
    }

    @Test
    void get_Adotantes_status204SemCorpo(){
        when(repository.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity response = controller.getAdotantes();

        assertEquals(204, response.getStatusCodeValue());

        assertFalse(response.hasBody());

        assertNull(response.getBody());
    }

    @Test
    void get_Adotante_status200ComCorpo(){
        Integer id = 100;
        Adotante adotanteMock = mock(Adotante.class);
        when(repository.findById(id)).thenReturn(java.util.Optional.ofNullable(adotanteMock));

        ResponseEntity response = controller.getAdotante(id);

        assertEquals(200,response.getStatusCodeValue());
        assertTrue(response.hasBody());
        assertEquals(adotanteMock, response.getBody());

    }

    @Test
    void post_login_status200(){
        Login login = mock(Login.class);
        Adotante adotante = mock(Adotante.class);
        when(repository.findByEmailAndSenha(login.getEmail(), login.getSenha())).thenReturn(adotante);

        ResponseEntity response = controller.loginAdotante(login);

        assertEquals(200,response.getStatusCodeValue());
        assertTrue(response.hasBody());

    }

    @Test
    void post_login_status404(){
        Login login = mock(Login.class);
        Adotante adotante = mock(Adotante.class);
        when(repository.findByEmailAndSenha(login.getEmail(), login.getSenha())).thenReturn(null);

        ResponseEntity response = controller.loginAdotante(login);

        assertEquals(404,response.getStatusCodeValue());
        assertFalse(response.hasBody());

    }
}