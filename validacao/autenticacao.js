function validaAutenticacao(usuario,senha){
    if(usuario == 'admin' && senha == '123456'){
        return true;
    }else{
        return false
    }
};

export default validaAutenticacao;
