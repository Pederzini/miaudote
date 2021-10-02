package br.com.miaudote.miaudote;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/miaudote")
public class UsuarioController {

    List<Usuario> usuarios = new ArrayList<>( List.of(new Adotante("joao@123","123","123124","12314","12314","123123,","bruno")));


    //localhost:8080/miaudote/cadastrar-ong/ong@gmail.com/ong123/11111111111/Rua Haddock Lobo/65365869000185/05-03-2002/Joana Leiva/Adote 1 amigo
    @GetMapping("/cadastrar-ong/{email}/{senha}/{telefone}/{rua}/{cnpj}/{dataFundacao}/{nomeResponsavel}/{razaoSocial}")
    public String cadastrarOng(@PathVariable String email,
                               @PathVariable String senha,
                               @PathVariable String telefone,
                               @PathVariable String rua,
                               @PathVariable String cnpj,
                               @PathVariable String dataFundacao,
                               @PathVariable String nomeResponsavel,
                               @PathVariable String razaoSocial) {

        Usuario usuario = new Ong(email, senha, telefone, rua, cnpj, dataFundacao, nomeResponsavel, razaoSocial);
        if (usuario.verificarIdentidade(cnpj)) {
            usuarios.add(usuario);
            return String.format("ONG %s cadastrada com sucesso", razaoSocial);
        }

        return "CNPJ inválido";
    }

    //localhost:8080/miaudote/cadastrar-adotante/adotante@gmail.com/adotante123/22222222222/Rua José Soriano de Souza/31798210002/20-12-1995/Carol Vieira

    @PostMapping
    public String cadastrarAdotante(@RequestBody Adotante adotante){
        usuarios.add(adotante);
        return "Usuário cadastrado com sucesso";
    }

//    @GetMapping("/cadastrar-adotante/{email}/{senha}/{telefone}/{rua}/{cpf}/{dataNascimento}/{nome}")
//    public String cadastrarAdotante(@PathVariable String email,
//                                    @PathVariable String senha,
//                                    @PathVariable String telefone,
//                                    @PathVariable String rua,
//                                    @PathVariable String cpf,
//                                    @PathVariable String dataNascimento,
//                                    @PathVariable String nome) {
//
//        Usuario usuario = new Adotante(email, senha, telefone, rua, cpf, dataNascimento, nome);
//        if (usuario.verificarIdentidade(cpf)) {
//            usuarios.add(usuario);
//            return String.format("Adotante %s cadastrado(a) com sucesso", nome);
//        }
//
//        return "CPF inválido";
//    }

    @GetMapping("/usuarios")
    public List<Usuario> exibirUsuarios() {

        return usuarios;
    }

    //localhost:8080/miaudote/login/ong@gmail.com/ong123
    @GetMapping("/login/{email}/{senha}")
    public Usuario realizarLogin(@PathVariable String email,
                                 @PathVariable String senha) {

        for (Usuario usuario : usuarios) {
            if (usuario.getEmail().equals(email)) {
                if (usuario.autenticarLogin(email, senha)) {
                    return usuario;
                }
            }
        }

        return null;
    }

    //localhost:8080/miaudote/logoff/ong@gmail.com
    @GetMapping("/logoff/{email}")
    public String realizarLogoff(@PathVariable String email) {

        for (Usuario usuario : usuarios) {
            if (usuario.getEmail().equals(email) && usuario.getAutenticado()) {
                usuario.logoff();
                if (usuario instanceof Adotante) {
                    return String.format("Adotante %s saiu do sistema",((Adotante) usuario).getNome());
                } else {
                    return String.format("ONG %s saiu do sistema", ((Ong) usuario).getRazaoSocial());
                }
            }
        }

        return String.format("Usuário %s não autenticado", email);
    }

    @DeleteMapping("/{nome}")
    public String deletarUsuario(@PathVariable String nome) {
        for (Usuario usuario : usuarios) {

            if (usuario.getNome().equals(nome)) {
                usuarios.remove(usuario);
                return "Usuário deletado com sucesso";
            }
        }
        return "Usuário não encontrado";
    }

    @PutMapping("/{nome}")
    public String atualizarUsuario(@RequestBody Adotante usuarioAtualizado,
                                   @PathVariable String nome){
        usuarioAtualizado.setNome(nome);
        deletarUsuario(nome);
        usuarios.add(usuarioAtualizado);
        return "Usuário atualizado";
    }
}
