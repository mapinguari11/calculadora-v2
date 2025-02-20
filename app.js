let displayAnterior = document.getElementById('display-anterior');
let displayAtual = document.getElementById('display-atual');
let valorAtual = extrairNumeros(displayAtual.textContent);
let valorAnterior = extrairNumeros(displayAnterior.textContent);
let calculadora = 0;
let tipo = '';

function registrarNumero(id) { 
    // registra qual tecla de número o usuário pressionou e mostra no visor 
    let numero = id;
    let conteudoDisplayAtual = displayAtual.textContent; // pega o que já está armazenado no display de cima 
    console.log(numero);
    displayAtual.innerHTML = conteudoDisplayAtual + numero; // atualiza o display com o novo número digitado
    limitarTamanho(displayAtual, 25);
}

function registrarOperacao(operacao) {

    valorAnterior = extrairNumeros(displayAnterior.textContent);
    valorAtual = displayAtual.textContent;

    console.log('Valor anterior: ' + valorAnterior.textContent);
    
    if (valorAnterior) {
        calcular();
        console.log('Calculadora: ' + calculadora);
        displayAnterior.innerHTML = calculadora;
        displayAtual.innerHTML = '';
    } else {
        displayAnterior.innerHTML = displayAtual.textContent;
        displayAtual.innerHTML = '';
    }
    tipo = operacao;

    switch (tipo) {
        case adicao:
            displayAnterior.innerHTML = displayAnterior.textContent + '+';
            break;
        case subtracao:
            displayAnterior.innerHTML = displayAnterior.textContent + '-';
            break
        case multiplicacao:
            displayAnterior.innerHTML = displayAnterior.textContent + 'x';
            break
        case divisao:
            displayAnterior.innerHTML = displayAnterior.textContent + '/';
            break;
    }
}

function calcular() {
    valorAnterior = extrairNumeros(displayAnterior.textContent);
    valorAtual = displayAtual.textContent;
    console.log(`Anterior: ${valorAnterior}`);
    console.log(`Atual: ${valorAtual}`);
    switch (tipo) {
        case adicao:
            calculadora = parseInt(valorAnterior) + parseInt(valorAtual);
            console.log(calculadora);
            break;
        case subtracao:
            calculadora = parseInt(valorAnterior) - parseInt(valorAtual);
            break;
        case multiplicacao:
            calculadora = parseInt(valorAnterior) * parseInt(valorAtual);
            break;
        case divisao:
            if (parseInt(valorAtual) === 0) {
                alert('Não pode dividir por 0. Informe outro valor');
                return;
            }
            calculadora = parseInt(valorAnterior) / parseInt(valorAtual);
            break;
        default:
            alert('Operação não reconhecida');
    }
}

function exibirResultado() {
    calcular();
    displayAnterior.innerHTML = calculadora;
    displayAtual.innerHTML = '';
}

function extrairNumeros(conteudo) {
    // Remove tudo que não for número
    return conteudo.replace(/\D+/g, '');
}

function limpar() {
    displayAnterior.innerHTML = '';
    displayAtual.innerHTML = '';
    valorAnterior = '';
    valorAtual = '';
    calculadora = 0;
    tipo = '';
}

function deletar() {
    let atualArray = displayAtual.textContent.split('');
    let novoDisplayAtual = atualArray.slice(0, -1);
    let displayCorrigido = novoDisplayAtual.join('');
    displayAtual.innerHTML = displayCorrigido;
}

function limitarTamanho(elemento, limite) {
    // Obtenha o conteúdo atual do elemento
    let conteudo = elemento.textContent;

    // Verifique se o conteúdo excede o limite
    if (conteudo.length > limite) {
        // Corte o conteúdo para o limite desejado
        conteudo = conteudo.slice(0, limite);
    }

    // Atualize o conteúdo do elemento
    elemento.textContent = conteudo;
}