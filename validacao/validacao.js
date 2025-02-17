function validaNome(nome){
    const isValid = nome.length >= 2 && !(/\d/.test(nome));
    return isValid
}


function validaEmail(email){
   const regExpemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const isValid = regExpemail.test(email);

   return isValid;

}

function validaTelefone(telefone){
    const regexTelefone = /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/;
    const isValid = regexTelefone.test(telefone);

    return isValid;
}

function validarDados(nome,email,telefone){
    const nomeValido = validaNome(nome);
    const emailValido= validaEmail(email);
    const telefoneValido = validaTelefone(telefone);

    const dadosvalidados = nomeValido && emailValido && telefoneValido;

    if(dadosvalidados){
        return {status: true, mensagem: ''};
    }else {
        return {status: false, mensagem: 'Dados Inválidos'}
    }
};

export default validarDados;