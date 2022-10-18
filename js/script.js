const cards = document.querySelectorAll('.card');
const mesa = document.querySelector('.mesa');

let quantCartas;

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


//Função para criar cartas dinamicamente
const criaCartas = () => {
    const card = criaElemento('div', 'card');
    const front = criaElemento('div', 'front');
    const back = criaElemento('div', 'back')

    card.appendChild(front);
    card.appendChild(back);

    return card;
}


const mostrarCarta = ({ target }) => {
    target.parentNode.classList.add('virado');
}

//Função quer inicia o jogo
const carregaJogo = () => {

    //Entrada da quantidade de cartas no jogo
    quantCartas = prompt('Escolha a quantidade de cartas (Pares entre 4 e 14): ');
    mesa.appendChild(criaCartas());
}

carregaJogo();