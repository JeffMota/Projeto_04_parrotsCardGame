const cards = document.querySelectorAll('.card');
const mesa = document.querySelector('.mesa');

let quantCartas = 0;

const parrots = [
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'
]

//Função para criar elemento dinamicamente
const criaElemento = (tag, classe) => {
    let elem = document.createElement(tag);
    elem.classList.add(classe);

    return elem;
}

//Revela a carta
const mostrarCarta = ({ target }) => {
    target.parentNode.classList.add('virado');
}

//Função para criar cartas dinamicamente
const criaCartas = (parrot) => {
    const card = criaElemento('div', 'card');
    const front = criaElemento('div', 'front');
    const back = criaElemento('div', 'back');

    //Adicionar imagem 
    front.style.backgroundImage = `url(../img/${parrot}.gif)`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', mostrarCarta);

    return card;
}

function shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
}

//Função quer inicia o jogo
const carregaJogo = () => {
    let selecionadas = [];
    let jogo = [];

    //Entrada da quantidade de cartas no jogo
    while (quantCartas % 2 != 0 || quantCartas > 14 || quantCartas < 4) {
        quantCartas = prompt('Escolha a quantidade de cartas (Pares entre 4 e 14): ');
    }

    mesa.style.gridTemplateColumns = `repeat(${quantCartas / 2}, 1fr)`;

    let embaralhada = shuffleArray(parrots);
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < quantCartas / 2; i++) {
            selecionadas.push(embaralhada[i]);
        }
    }

    jogo = shuffleArray(selecionadas);


    for (let i = 0; i < jogo.length; i++) {

        mesa.appendChild(criaCartas(jogo[i]));
    }


}

carregaJogo();