import pool from './conexao.js';

async function listarUsuario(){
    const conexao = await pool.getConnection();

    const listausuario = await conexao.query("select * from usuario");

    const usuarios = listausuario[0];

    conexao.release();

    return usuarios;
};

export default listarUsuario;
