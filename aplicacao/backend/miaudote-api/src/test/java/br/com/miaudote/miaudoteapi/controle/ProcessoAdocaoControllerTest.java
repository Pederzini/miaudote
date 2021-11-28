package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.*;
import br.com.miaudote.miaudoteapi.dto.AdotanteQueFavoritouDTO;
import br.com.miaudote.miaudoteapi.dto.AnimalFavoritadoDTO;
import br.com.miaudote.miaudoteapi.dto.FeedbackDTO;
import br.com.miaudote.miaudoteapi.repositorio.AdotanteRepository;
import br.com.miaudote.miaudoteapi.repositorio.AnimalRepository;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
import br.com.miaudote.miaudoteapi.repositorio.ProcessoAdocaoRepository;
import org.apache.tomcat.jni.Proc;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {ProcessoAdocaoController.class, AnimalRepository.class, Animal.class, OngRepository.class,
        OngRepository.class, ProcessoAdocaoRepository.class, ProcessoAdocao.class})
class ProcessoAdocaoControllerTest {
    @Autowired
    ProcessoAdocaoController controller;

    @MockBean
    AnimalRepository animalRepository;

    @MockBean
    OngRepository ongRepository;

    @MockBean
    ProcessoAdocaoRepository processoRepository;

    @MockBean
    AdotanteRepository adotanteRepository;

    @Test
    void get_ProcessosAdocao_200ComCorpo(){
        List<ProcessoAdocao> lista = List.of(mock(ProcessoAdocao.class),mock(ProcessoAdocao.class));
        when(processoRepository.findAll()).thenReturn(lista);

        ResponseEntity response = controller.getProcessosAdocao();

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void get_ProcessosAdocao_204SemCorpo(){
        when(processoRepository.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity response = controller.getProcessosAdocao();

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    void get_AnimaisFavoritados_200ComCorpo(){
        AnimalFavoritadoDTO animal = mock(AnimalFavoritadoDTO.class);
        List<AnimalFavoritadoDTO> animais = new ArrayList<>();
        animais.add(animal);
        animais.add(animal);

        when(processoRepository.encontrarAnimaisFavoritados(anyString())).thenReturn(animais);

        ResponseEntity response = controller.getAnimaisFavoritados(anyString());

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.hasBody());

    }
    @Test
    void get_AnimaisFavoritados_204SemCorpo(){
        when(processoRepository.encontrarAnimaisFavoritados(anyString())).thenReturn(new ArrayList<>());

        ResponseEntity response = controller.getAnimaisFavoritados(anyString());

        assertEquals(204, response.getStatusCodeValue());
        assertFalse(response.hasBody());

    }

    @Test
    void get_VerificaExistenciaProcesso_200CasoAdotou(){
        Date data = new Date();
        Endereco enderecoMock = new Endereco("Rua Haddock Lobo",595,"Prédio Comercial","Consolação","01414-001","São Paulo");
        Adotante adotanteMock = new Adotante("tel", "email", "senha", "url", enderecoMock, "nome", data, "cpf");
        Ong ong = new Ong("","","","", enderecoMock,"","",data,"");
        Animal animalMock= new Animal("Pitoco","",data,"",data,"",false,"","",true,"",false,"","","");

        ProcessoAdocao processo = new ProcessoAdocao(data,data,true,"",1,"",adotanteMock,animalMock);

        when(processoRepository.findByAnimalIdAndAdotanteIdAndDataInicioProcessoNotNull(anyInt(),anyInt())).thenReturn(processo);

        ResponseEntity response = controller.verificaExistenciaProcessoAdocao(anyInt(),anyInt());

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void get_VerificaExistenciaProcesso_200CasoAindaNaoAdotou(){
        Date data = new Date();
        Endereco enderecoMock = new Endereco("Rua Haddock Lobo",595,"Prédio Comercial","Consolação","01414-001","São Paulo");
        Adotante adotanteMock = new Adotante("tel", "email", "senha", "url", enderecoMock, "nome", data, "cpf");
        Ong ong = new Ong("","","","", enderecoMock,"","",data,"");
        Animal animalMock= new Animal("Pitoco","",data,"",data,"",false,"","",true,"",false,"","","");

        ProcessoAdocao processo = new ProcessoAdocao(null,data,true,"",1,"",adotanteMock,animalMock);

        when(processoRepository.findByAnimalIdAndAdotanteIdAndDataInicioProcessoNotNull(anyInt(),anyInt())).thenReturn(processo);

        ResponseEntity response = controller.verificaExistenciaProcessoAdocao(anyInt(),anyInt());

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void get_VerificaExistenciaProcesso_404(){
        when(processoRepository.findByAnimalIdAndAdotanteIdAndDataInicioProcessoNotNull(anyInt(),anyInt())).thenReturn(null);

        ResponseEntity response = controller.verificaExistenciaProcessoAdocao(anyInt(),anyInt());

        assertEquals(404, response.getStatusCodeValue());
    }
}