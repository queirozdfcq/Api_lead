import pool from './conexao.js';

async function cadastrarUsuario(nome,email,telefone) {

    const conexao = await pool.getConnection();

    const cadastro = await conexao.query('insert into usuario(nome,email,telefone)values(?,?,?)',[nome,email,telefone]);

    console.log(cadastro);

    conexao.release()
    
};

export default cadastrarUsuario;