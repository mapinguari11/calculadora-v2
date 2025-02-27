let displayAnterior = document.getElementById('display-anterior');
let displayAtual = document.getElementById('display-atual');
let valorAtual = parseFloat(extrairNumeros(displayAtual.textContent));
let valorAnterior = parseFloat(extrairNumeros(displayAnterior.textContent));
let calculadora = 0;
let tipo = '';

function registrarNumero(id) { 
    
    // registra qual tecla de número o usuário pressionou e mostra no visor 
    let numero = id;
    let conteudoDisplayAtual = displayAtual.textContent; // pega o que já está armazenado no display de cima 
    
    if (conteudoDisplayAtual === '0') {
        displayAtual.innerHTML = numero;    
    } else {
        displayAtual.innerHTML = conteudoDisplayAtual + numero; // atualiza o display com o novo número digitado
    }
    
    limitarTamanho(displayAtual, 25);
}

function registrarOperacao(operacao) {
    console.log(operacao.textContent);
    valorAnterior = extrairNumeros(displayAnterior.textContent);
    valorAtual = displayAtual.textContent;

    // Verifica se o valor atual é um número válido
    if (!isNaN(parseFloat(valorAtual)) && valorAtual !== '') {
        if (valorAnterior) {
            calcular();
            displayAnterior.innerHTML = calculadora;
            displayAtual.innerHTML = '';
        } else {
            displayAnterior.innerHTML = displayAtual.textContent;
            displayAtual.innerHTML = '';
        }
    }

    tipo = operacao;

    // Atualiza o display anterior com o valor anterior e o novo operador
    let valorDisplayAnterior = extrairNumeros(displayAnterior.textContent);
    if (!isNaN(parseFloat(valorDisplayAnterior)) && valorDisplayAnterior !== '') {
        switch (tipo) {
            case adicao:
                displayAnterior.innerHTML = valorDisplayAnterior + '+';
                break;
            case subtracao:
                displayAnterior.innerHTML = valorDisplayAnterior + '-';
                break;
            case multiplicacao:
                displayAnterior.innerHTML = valorDisplayAnterior + 'x';
                break;
            case divisao:
                displayAnterior.innerHTML = valorDisplayAnterior + '/';
                break;
        }
    }
}

function calcular() {
    valorAnterior = extrairNumeros(displayAnterior.textContent);
    valorAtual = displayAtual.textContent;
    switch (tipo) {
        case adicao:
            calculadora = parseInt(valorAnterior) + parseInt(valorAtual);
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
    if (displayAnterior.textContent === '' || displayAtual.textContent === '') {
        alert('Operação não reconhecida');
        return;
    } else {
        calcular();
        displayAtual.innerHTML = calculadora;
        displayAnterior.innerHTML = '';
        calculadora = 0;
    }
}

function extrairNumeros(conteudo) {
    // Remove tudo que não for número
    return conteudo.replace(/[^0-9.]/g, '');
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