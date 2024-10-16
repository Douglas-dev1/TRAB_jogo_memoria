const buttonRadon = document.getElementById("randon")               /*ARAMZENA A REFERENCIA DO ELEMENTO BUTTON COM ID RANDON PARA MANIPULAR A MESMA NO JS*/
const imagesCards = [
    'assets/card1.jpg',
    'assets/card2.jpg',
    'assets/card3.jpg',
    'assets/card4.jpg',
    'assets/card5.jpg',
    'assets/card6.jpg',
    'assets/card7.jpg',
    'assets/card8.jpg',
]
const container = document.getElementById("cards");                 /*ARAMZENA A REFERENCIA DO ELEMENTO DIV COM ID CARDS PARA MANIPULAR A MESMA NO JS*/
/*DUPLAICANDO O ARRAY DE IMAGENS*/
const doubleimageCards = imagesCards.concat(imagesCards);           /*CRIA UM NOVO ARRAY(doubleimageCards) QUE É A COMBINAÇÃO DO ARRAY ORIGINAL(imagesCards.concat) COM O ARRAY QUE É PASSADO COMO PARAMETRO((imagesCards))*/

let mensagemFinal1 = null;

let Carta1 = null;
let Carta2 = null;
let bloqCarta = null;
let contador = null
let pontos = null;
let endgame = null;
let tempoRestante = 60;
let cronometro = null;

const mensagemElement = document.getElementById('mensagem');

function delay(ms) {                                                /*FUNÇÃO DE DELAY*/
    return new Promise(resolve => setTimeout(resolve, ms))
}

distribuiCards();


function distribuiCards(mostrarCartas = false) {
    container.innerHTML = '';                                           /*PARA LIMPAR O CONTAINER*/

    for (let i = 0; i < 4; i++) {                                       /*CRIANDO E DISTRIBUINDO OS CARDS*/
        for (let j = 0; j < 4; j++) {
            const card = document.createElement('div');                 /*CRIA UM BOTAO E ARAMZENA SUA REFERENCIA EM CONST PARA QUE POSSAMOS MANIPULAR COM JS*/
            card.className = 'cardStyle';                               /*CRIAMOS UM ID PARA ESSE ELEMENTO*/
            card.id = `card${i}${j + 1}`;                                   /*CRIAMOS UM ID UNICO PARA CADA BOTAO*/

            /*CRIA O CORPO DO CARD*/
            const corpoCard = document.createElement('div');            /*CRIA A DIV*/
            corpoCard.className = 'cCard';                              /*NOMEIA A CLASSE*/
            /*CRIA A FRENTE DO CARD E ATRIBUI A IMAGEM*/
            const frenteCard = document.createElement('div');           /*CRIA DIV*/
            frenteCard.className = 'fCard'                              /*NOMEIA CLASSE*/
            frenteCard.style.backgroundImage = 'url("assets/versoCard.jpg")';   /*ATRIBUI A IMAGEM DE FUNDO */
            /*CRIA O VERSO DO CARD E ATRIBUI A IMAGEM*/
            const versoCard = document.createElement('div');            /*CRIA A DIV*/
            versoCard.className = 'vCard'                               /*NOMEIA A CLASSE*/
            versoCard.style.backgroundImage = `url(${doubleimageCards[i * 4 + j]})`;    /*ATRIBUI A IMAGEM ITERANDO ENTRE OS ITENS DO VETOR E ATRIBUINDO*/
            /*GUARDAMOS FRENTE E VERSO DO CARD NO CORPO DE CAR*/
            corpoCard.appendChild(frenteCard);
            corpoCard.appendChild(versoCard);
            /*GUARDAMOS CORPOCARD EM CARD*/
            card.appendChild(corpoCard);

            if (mostrarCartas) { /*QUANDO TRUE IRA PASSAR POR AQUI E MUDAR A IMAGEM DAS CARTAS*/
                card.classList.add('card-flipped')
                console.log('Passou aqui');
            }

            card.addEventListener('click', function () {                        /*CRIAMOS O EVENTO CASO HAJA UM CLICK*/
                if (!bloqCarta && !card.classList.contains('card-flipped')) {   /*CONDIÇÃO PARA BLOQUEAR O CLIQUE EM UMA TERCEIRA CARTA, SE AS DUAS JA ESTIVEREM VIRADAS*/
                    card.classList.add('card-flipped');                         /*ADCIONA OU REMOVE CARD-FLIPPED, SE O ELEMENTO JA TIVER A CLASSE ESSE COMANDO REMOVE E VICE E VERSA*/
                    verificaCartas(card);
                    console.log(`Card ${i}${j + 1} clicado!`);                     /*MOSTRA NO CONSOLE QUAL CARD FOI CLICADO*/
                }
            });

            container.appendChild(card)                     /*JOGA DENTRO DA DIV O OBJETO CARD*/
        }
    }
}

function embaralhaArray(array) {
    for (let i = array.length - 1; i > 0; i--) {                    /*IRÁ PERCORRER TODO O VETOR PARA EMBARALHAR*/
        const aux = Math.floor(Math.random() * (i + 1));            /*FUNÇÃO MATEMATICA QUE IRÁ GERAR O NUMERO ALEATORIO DENTRO DO RANGE(16)*/
        [array[i], array[aux]] = [array[aux], array[i]];            /*TROCA A POSIÇÃO ATUAL COM A POSIÇÃO ALEATÓRIA GERADA*/
    }
}

buttonRadon.addEventListener("click", async (event) => {            /*EVENTO DE CLIQUE NO BOTÃO EMBARALHAR*/
    event.preventDefault();
    pontos = 0;
    bloqCarta = false;
    mensagemElement.innerText = 'Iniciado!';
    embaralhaArray(doubleimageCards);                               /*EMBARALHA OS ELEMENTOS DENTRO DO VETOR*/
    distribuiCards(true);                                           /*GERA OS CARDS E MOSTRA NA TELA E MOSTRA PARA MEMORIZAÇÃO = TRUE*/
    await delay(5000);                                             /*AGUARDA 15S SÓ FUNCIONA DENTRO DE FUNÇOES ASSINCRONAS, CORRIGIR ADDEVENTLISTNER("click", async (event))*/
    distribuiCards(false);                                          /*GERA OS CARDS E MOSTRA NA TELA E ESCONDE POR PADRAO DA REGRA DO CSS*/
    initTemporizador()
});

function verificaCartas(card) {
    if (!Carta1) {
        Carta1 = card;
    }
    else if (!Carta2) {
        Carta2 = card;
        bloqCarta = true;
        setTimeout(() => { /*MOSTRA AS CARTAS DURANTE 1 SEGUNDO ANTES DE COMPARAR*/
            comparaCartas()
        }, 1000)
    }
}

function comparaCartas() {
    /*ACESSAMOS OS ENDEREÇOS DAS DUAS IMAGENS DAS CARTAS CLICADAS E SALVAMOS EM VARIAVEIS TEMPORARIAS PARA PODERMOS COMPARAR*/ 
    const imagemCarta1 = Carta1.querySelector('.vCard').style.backgroundImage;
    const imagemCarta2 = Carta2.querySelector('.vCard').style.backgroundImage;

    if (imagemCarta1 === imagemCarta2) {
        Carta1.innerHTML;
        Carta2.innerHTML;
        console.log('Cartas iguais!');
        pontos++;
        if(pontos == 8){
            bloqueioClick = true;                               /*BLOQUEIA PARA NOVOS CLIQUES*/
            mensagemElement.innerText = 'Ganhou!';
        }
    }
    else {
        Carta1.classList.remove('card-flipped');
        Carta2.classList.remove('card-flipped');
        console.log('Cartas Diferentes!');
    }
    Carta1 = null
    Carta2 = null
    bloqCarta = null
}

function initTemporizador(){
    cronometro = setInterval(() => {
        tempoRestante--;                                    /*DECREMENTA DOS 60S*/
        document.getElementById('temp').innerText = `Tempo restante: ${tempoRestante}s`; /*PARA MOSTRARMOS O TEMPO*/

        // Verifica se o tempo acabou
        if (tempoRestante <= 0) {
            clearInterval(cronometro);                          /*PARA O CRONOMETRO*/
            bloqueioClick = true;                               /*BLOQUEIA PARA NOVOS CLIQUES*/
            mensagemElement.innerText = 'Tempo esgotado!';      /*EXIBE A MENSAGEM TEMPO ESGOTADO */
        }
    }, 1000);  // Intervalo de 1 segundo
}