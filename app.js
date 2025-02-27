//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

// Lista para armazenar nomes até o sorteio.
let listaNomes = [];


let habilitarSpeech = true;
document.getElementById('habilitarSpeech').addEventListener('change', function (event) {
    habilitarSpeech = event.target.checked;
});


// Adiciona um nome à lista e atualiza a exibição
function adicionarAmigo() {
    let nomeDigitado = document.querySelector("input").value.trim();

    if (nomeDigitado === '') {
        alert('Insira um nome para poder continuar!');
    } else if (listaNomes.includes(nomeDigitado)) {
        alert('Este nome já foi adicionado. Por favor, insira um nome diferente.');
    } else {
        listaNomes.push(nomeDigitado);
        exibirNomes();
        limparCampo();
    }
}

// Exibe os nomes na lista
function exibirNomes() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";

    let listaHTML = listaNomes.map(nome => `<li>${nome}</li>`).join('');
    listaAmigos.innerHTML = listaHTML;
}

// Sorteia um nome da lista
function sortearAmigo() {
    let quantidadeNomes = listaNomes.length;
    let indiceSorteado = Math.floor(Math.random() * quantidadeNomes);
    let amigoSorteado = listaNomes[indiceSorteado];

    if (listaNomes.length == "") {
        alert('Nenhum nome adicionado ainda :)');
    } else {
        let resultado = "O seu amigo sorteado é: " + amigoSorteado;
        document.getElementById("resultado").innerHTML = "<li>" + resultado + "</li>";

        if (habilitarSpeech && 'speechSynthesis' in window) {
            console.log('API de síntese de voz disponível');
            let utterance = new SpeechSynthesisUtterance(resultado);
            utterance.lang = 'pt-BR';
            utterance.rate = 1.2;

            utterance.onstart = function() {
                console.log('Síntese de voz iniciada');
            };

            utterance.onerror = function(event) {
                console.error('Erro na síntese de voz:', event.error);
                alert('Desculpe, não foi possível reproduzir o resultado. Verifique as configurações do seu dispositivo.');
            };

            window.speechSynthesis.speak(utterance);
        } else {
            console.log('API de síntese de voz não disponível');
        }

        document.getElementById('listaAmigos').innerHTML = "";
        listaNomes = [];
    }
}


function limparCampo() {
    let campoNome = document.querySelector("input");
    campoNome.value = '';
}