const mesa = document.querySelector('.mesa');
const relogio = document.querySelector('.relogio');

let quantCartas = 0;
let primeiraCarta = '';
let segundaCarta = '';
let numeroJogadas = 0;
let pontos = 0;
let tempo;

const parrots = [
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'
]

//Contagem do relogio
setInterval(() => {
    relogio.innerHTML = +relogio.innerHTML + 1;
    tempo = relogio.innerHTML;
}, 1000)

//Revela a carta (Lógica principal do jogo onde as cartas são comparadas)
const mostrarCarta = ({ target }) => {
    target.parentNode.classList.add('virado');
    if (primeiraCarta == '') {
        primeiraCarta = target.parentNode.id;

    }
    else {
        numeroJogadas++;

        segundaCarta = target.parentNode.id;


        const cards = document.querySelectorAll('.card');
        const selecao = document.querySelectorAll('.virado')
        cards.forEach(e => {
            e.removeEventListener('click', mostrarCarta);
        })

        setTimeout(() => {
            if (primeiraCarta == segundaCarta) {
                selecao.forEach(e => {
                    e.classList.add('disabled');
                })
                primeiraCarta = '';
                segundaCarta = '';
                pontos++;
            }
            else {
                selecao.forEach(e => {
                    if (!e.classList.contains('disabled')) {
                        e.classList.remove('virado');
                    }
                })
                primeiraCarta = '';
                segundaCarta = '';
            }
            cards.forEach(e => {
                e.addEventListener('click', mostrarCarta);
            })
            if (pontos == quantCartas / 2) {
                cards.forEach(e => {
                    e.removeEventListener('click', mostrarCarta);
                })

                alert(`Você ganhou em ${numeroJogadas} jogadas e ${tempo} segundos`);
                let resp = prompt("Deseja jogar novamente? ('sim' ou 'não')")
                while(resp != 'sim' && resp != 'não'){
                    resp = prompt("Responda apenas com 'sim' ou 'não'");
                }
                if (resp == 'sim') {
                    document.location.reload();
                }
                else {
                    if (resp == 'não') {
                        return
                    }
                }
            }

        }, 700)

        const desabilitadas = document.querySelectorAll('.disabled')
        desabilitadas.forEach(e => {
            e.removeEventListener('click', mostrarCarta);
        })
    }
}

//Função para criar elemento dinamicamente
const criaElemento = (tag, classe) => {
    let elem = document.createElement(tag);
    elem.classList.add(classe);

    return elem;
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
    card.id = `${parrot}`

    return card;
}

//Função que embaralha
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

//Função que inicia o jogo
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