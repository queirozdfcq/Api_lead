import express from 'express';
import cors from 'cors';
import cadastrarUsuarios from './servico/cadastrar_usuario.js';
import listarUsuarios from './servico/listar_usuario.js';
import validarDados from './validacao/validacao.js';
import validaAutenticacao from './validacao/autenticacao.js';
import {GeraToken, validaToken} from './servico/servico_autenticacao.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/usuarios', async (req,res) => {
    let token;

    if(typeof req.headers.authorization !== 'undefined'){
        token = req.headers.authorization.split(' ')[1]
    }else{
        token = -1
    }

    const tokenValido = validaToken(token);

    if(!tokenValido.status){
        res.status(tokenValido.codigo).end()
        return
    }

    const listaUsuario = await listarUsuarios();

    res.status(tokenValido.codigo).send(listaUsuario);
})

app.post('/login', (req,res)=>{
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    const autenticacaoValida = validaAutenticacao(usuario,senha);

    if(!autenticacaoValida){
        res.status(401).send({mensagem: "Usuario não autorizado"});
        return;
    }

    const token = GeraToken();

    res.status(200).send({token: token})

});

app.post('/usuarios', async (req,res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;

    const validaDados = validarDados(nome,email,telefone);

    if(validaDados.status){
        await cadastrarUsuarios(nome,email,telefone);
        res.status(204).end();
    }else{
        res.status(400).send({mensagem: validaDados.mensagem});
    }
   
});

app.listen(3000, () => {
    console.log("Servidor Iniciado");

});