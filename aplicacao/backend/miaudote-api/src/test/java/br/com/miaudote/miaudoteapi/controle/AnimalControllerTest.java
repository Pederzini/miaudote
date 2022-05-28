package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Adotante;
import br.com.miaudote.miaudoteapi.dominio.Animal;
import br.com.miaudote.miaudoteapi.dominio.Endereco;
import br.com.miaudote.miaudoteapi.dominio.Ong;
import br.com.miaudote.miaudoteapi.dto.*;
import br.com.miaudote.miaudoteapi.repositorio.AdotanteRepository;
import br.com.miaudote.miaudoteapi.repositorio.AnimalRepository;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
import br.com.miaudote.miaudoteapi.repositorio.ProcessoAdocaoRepository;
import br.com.miaudote.miaudoteapi.utilitarios.ManipulaArquivo;
import org.apache.catalina.LifecycleState;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = {AnimalController.class, AnimalRepository.class, Animal.class, OngRepository.class,
        OngRepository.class, ProcessoAdocaoRepository.class})
class AnimalControllerTest {
    @Autowired
    AnimalController controller;

    @MockBean
    AnimalRepository repository;

    @MockBean
    OngRepository ongRepository;

    @MockBean
    AdotanteRepository adotanteRepository;

    @MockBean
    ProcessoAdocaoRepository processoRepository;

    @Test
    void get_Animais_status200ComCorpo(){
        List<Animal> lista = new ArrayList<>();
        Animal animal1 = mock(Animal.class);
        Animal animal2 = mock(Animal.class);
        lista.add(animal1);
        lista.add(animal2);

        when(repository.findAll()).thenReturn(lista);

        ResponseEntity response = controller.getAnimais();

        assertEquals(200, response.getStatusCodeValue());

        assertTrue(response.hasBody());

        assertNotNull(response.getBody());
    }

    @Test
    void get_Animais_status204SemCorpo(){
        when(repository.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity response = controller.getAnimais();

        assertEquals(204, response.getStatusCodeValue());

        assertFalse(response.hasBody());

        assertNull(response.getBody());
    }

    @Test
    void get_Animal_status200ComCorpo(){
        Integer id = 100;
        Animal animalMock = mock(Animal.class);
        when(repository.existsById(id)).thenReturn(true);
        when(repository.findById(id)).thenReturn(Optional.ofNullable(animalMock));
        ResponseEntity response = controller.getAnimal(id);

        assertEquals(200,response.getStatusCodeValue());
        assertTrue(response.hasBody());
    }

    @Test
    void get_Animal_status404SemCorpo(){
        Integer id = 100;
        Animal animalMock = null;
        when(repository.findById(id)).thenReturn(Optional.ofNullable(animalMock));
        ResponseEntity response = controller.getAnimal(id);

        assertEquals(404,response.getStatusCodeValue());
        assertFalse(response.hasBody());
    }

    @Test
    void get_AnimaisOng_status200ComCorpo(){
        String cnpj = "";
        Ong ongMock = mock(Ong.class);
        List<CardAnimalOngDTO> lista = new ArrayList<CardAnimalOngDTO>();
        CardAnimalOngDTO animal1 = mock(CardAnimalOngDTO.class);
        CardAnimalOngDTO animal2 = mock(CardAnimalOngDTO.class);
        lista.add(animal1);
        lista.add(animal2);

        when(ongRepository.findByCnpj(cnpj)).thenReturn(ongMock);
        when(repository.findByOngId(ongMock.getIdOng())).thenReturn(lista);


        ResponseEntity response = controller.getAnimaisOng(cnpj);


        assertEquals(200,response.getStatusCodeValue());
        assertTrue(response.hasBody());
        assertNotNull(response.getBody());
    }

    @Test
    void get_AnimaisOng_status204SemCorpo(){
        String cnpj = "";
        Ong ongMock = mock(Ong.class);
        when(ongRepository.findByCnpj(cnpj)).thenReturn(ongMock);
        when(repository.findByOngId(ongMock.getIdOng())).thenReturn(new ArrayList<>());

        ResponseEntity response = controller.getAnimaisOng(cnpj);

        assertEquals(204,response.getStatusCodeValue());
        assertFalse(response.hasBody());
        assertNull(response.getBody());
    }

    @Test
    void delete_Animal_status200ComSucesso(){
        Integer id = 100;
        Animal animal = mock(Animal.class);

        when(repository.existsById(id)).thenReturn(true);
        when(repository.getById(id)).thenReturn(animal);

        ResponseEntity response = controller.deleteAnimal(100);

        assertEquals(200,response.getStatusCodeValue());

    }

    @Test
    void delete_Animal_status404SemSucesso(){
        Integer id = 100;
        Animal animal = mock(Animal.class);
        List<Animal> lista = new ArrayList<>();
        lista.add(animal);

        when(repository.existsById(id)).thenReturn(false);

        ResponseEntity response = controller.deleteAnimal(100);

        assertEquals(404,response.getStatusCodeValue());

    }

    @Test
    void get_AnimaisVitrine_200ComCorpo(){
        List<AnimalVitrineDTO> animais = new ArrayList<AnimalVitrineDTO>();
        AnimalVitrineDTO vitrine = mock(AnimalVitrineDTO.class);
        AnimalVitrineDTO vitrine2 = mock(AnimalVitrineDTO.class);
        AnimalVitrineDTO vitrine3 = mock(AnimalVitrineDTO.class);
        animais.add(vitrine);
        animais.add(vitrine2);
        animais.add(vitrine3);
        when(repository.findRandomTop3()).thenReturn(animais);

        ResponseEntity response = controller.getAnimaisVitrine();

        assertEquals(200,response.getStatusCodeValue());
        assertTrue(response.hasBody());
        assertTrue(response.getBody().equals(animais));



    }

    @Test
    void get_AnimaisVitrine_204SemCorpo(){
        when(repository.findRandomTop3()).thenReturn(new ArrayList<>());

        ResponseEntity response = controller.getAnimaisVitrine();

        assertEquals(204,response.getStatusCodeValue());
        assertFalse(response.hasBody());
    }

    @Test
    void get_perfilAnimal_200ComCorpo(){
        PerfilAnimalDTO perfilAnimal = mock(PerfilAnimalDTO.class);

        when(processoRepository.findByAnimalIdAndAdotanteIdAndFavoritadoTrue(anyInt(),anyInt())).thenReturn(perfilAnimal);

        ResponseEntity response = controller.getPerfilAnimal(anyInt(),anyInt());

        assertEquals(200,response.getStatusCodeValue());
        assertTrue(response.hasBody());
        assertTrue(response.getBody().equals(perfilAnimal));
    }

    @Test
    void get_perfilAnimal_404SemCorpo(){

        when(processoRepository.findByAnimalIdAndAdotanteIdAndFavoritadoTrue(anyInt(),anyInt())).thenReturn(null);

        ResponseEntity response = controller.getPerfilAnimal(anyInt(),anyInt());

        assertEquals(404,response.getStatusCodeValue());
        assertFalse(response.hasBody());
    }

    @Test
    void get_perfilAnimal_200SemProcessoAdocao(){
        Integer id = 100;
        Animal animal = mock(Animal.class);
        when(processoRepository.findByAnimalIdAndAdotanteIdAndFavoritadoTrue(20,id)).thenReturn(null);
        when(repository.existsById(id)).thenReturn(true);
        when(repository.findById(id)).thenReturn(Optional.ofNullable(animal));

        ResponseEntity response = controller.getPerfilAnimal(20,id);

        assertEquals(200,response.getStatusCodeValue());
        assertTrue(response.hasBody());
    }

    @Test
    void get_NumeroAnimaisAdotados_MaiorQueUm(){
        List<Animal> lista = new ArrayList<>();
        Animal animalMock = mock(Animal.class);
        Animal animalMock2 = mock(Animal.class);
        Animal animalMock3 = mock(Animal.class);
        lista.add(animalMock);
        lista.add(animalMock2);
        lista.add(animalMock3);

        when(repository.countByAdotadoTrue()).thenReturn(lista.size());

        ResponseEntity response = controller.getNumeroAnimaisAdotados();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(lista.size(), response.getBody());
    }

    @Test
    void get_NumeroAnimaisAdotados_Zerado(){
        List<Animal> lista = new ArrayList<>();

        when(repository.countByAdotadoTrue()).thenReturn(lista.size());

        ResponseEntity response = controller.getNumeroAnimaisAdotados();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(lista.size(), response.getBody());
    }
/*
    @Test
    void get_NaoAdotados_200ComCorpo(){
        Integer id = 100;
        List<CardAnimalSemDistanciaDTO> lista1 = new ArrayList<>();
        CardAnimalSemDistanciaDTO animal = mock(CardAnimalSemDistanciaDTO.class);
        CardAnimalSemDistanciaDTO animal2 = mock(CardAnimalSemDistanciaDTO.class);
        CardAnimalSemDistanciaDTO animal3 = mock(CardAnimalSemDistanciaDTO.class);
        lista1.add(animal);
        lista1.add(animal2);
        lista1.add(animal3);
        Endereco enderecoMock =
                new Endereco("Rua Haddock Lobo",595,"Prédio Comercial","Consolação","01414-001","São Paulo");
        Adotante adotanteMock = new Adotante("tel", "email", "senha", "url", enderecoMock, "nome", new Date(), "cpf");
        Animal animalMock= new Animal("Pitoco","",new Date(),"",new Date(),"",false,"","",true,"",false,"","","");

        List<InfosAdotanteDTO> infosAdotante = new ArrayList<>();
        InfosAdotanteDTO adotante = new InfosAdotanteDTO() {
            @Override
            public Boolean getFavoritado() {
                return true;
            }

            @Override
            public Adotante getAdotante() {
                return (InfosAdotanteDTO.Adotante)adotanteMock;
            }

            @Override
            public Animal getAnimal() {
                InfosAdotanteDTO.Animal animal = (InfosAdotanteDTO.Animal)animalMock;

                return (InfosAdotanteDTO.Animal)animalMock;
            }
        };
        InfosAdotanteDTO adotante2 = new InfosAdotanteDTO() {
            @Override
            public Boolean getFavoritado() {
                return true;
            }

            @Override
            public Adotante getAdotante() {
                return (InfosAdotanteDTO.Adotante)adotanteMock;
            }

            @Override
            public Animal getAnimal() {
                return null;
            }
        };
        infosAdotante.add(adotante);
        infosAdotante.add(adotante2);


        when(repository.findByAdotadoFalse()).thenReturn(lista1);
        when(processoRepository.findByAdotante_IdAndAnimal_AdotadoFalse(id)).thenReturn(infosAdotante);
        when(animal.getId()).thenReturn(1);
        ResponseEntity response = controller.getNaoAdotados(id);


        assertEquals(200,response.getStatusCodeValue());
        assertTrue(response.getBody().getClass().isInstance(CardAnimalComDistanciaDTO.class));
    }

 */
    @Test
    void get_GeraDocumento_200ComCorpo(){
        Endereco enderecoMock = new Endereco("Rua Haddock Lobo",595,"Prédio Comercial","Consolação","01414-001","São Paulo");
        Date data = new Date();
        Ong ong = new Ong("","","","", enderecoMock,"","",data,"");
        List<Animal> listaAnimais = new ArrayList<>();
        Animal animalMock= new Animal("Pitoco","",data,"",data,"",false,"","",true,"",false,"","","");
        listaAnimais.add(animalMock);
        listaAnimais.add(animalMock);

        String relatorio = ManipulaArquivo.gravarArquivoTxt(listaAnimais,ong);

        when(ongRepository.findByCnpj(anyString())).thenReturn(ong);
        when(repository.findByOng(ong)).thenReturn(listaAnimais);

        ResponseEntity response = controller.geraDocumento(anyString());

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(relatorio,response.getBody());

    }
}