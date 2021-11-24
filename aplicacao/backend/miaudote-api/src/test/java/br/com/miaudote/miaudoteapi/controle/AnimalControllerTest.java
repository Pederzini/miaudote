package br.com.miaudote.miaudoteapi.controle;

import br.com.miaudote.miaudoteapi.dominio.Animal;
import br.com.miaudote.miaudoteapi.repositorio.AnimalRepository;
import br.com.miaudote.miaudoteapi.repositorio.OngRepository;
import br.com.miaudote.miaudoteapi.repositorio.ProcessoAdocaoRepository;
import org.apache.catalina.LifecycleState;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {AnimalController.class, AnimalRepository.class, Animal.class, OngRepository.class})
class AnimalControllerTest {
    @Autowired
    AnimalController controller;

    @MockBean
    AnimalRepository repository;

    @MockBean
    OngRepository ongRepository;

    @MockBean
    ProcessoAdocaoRepository processoRepository;

    @Test
    void get_Animal_status204SemCorpo(){
        when(repository.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity response = controller.getAnimais();

        assertEquals(204, response.getStatusCodeValue());

        assertFalse(response.hasBody());

        assertNull(response.getBody());
    }

    @Test
    void get_Animal_status200ComCorpo(){
        Integer id = 100;
        Optional<Animal> animalMock = Optional.ofNullable(new Animal());
        when(repository.existsById(id)).thenReturn(true);
        when(repository.findById(id)).thenReturn(animalMock);

        ResponseEntity response = controller.getAnimal(id);

        assertEquals(200,response.getStatusCodeValue());
        assertTrue(response.hasBody());
        assertEquals(animalMock, response.getBody());

    }

}