package br.com.miaudote.miaudoteapi.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor(access = AccessLevel.PUBLIC)
@Getter
public class AnimaisDisponiveisDTO {
    private Integer animaisDisponiveis;
    private Integer numeroGatos;
    private Integer numeroCachorro;
    private Integer numeroAdotados;
}
