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

let varA = 0;

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
            card.id = `card${i}${j}`;                                   /*CRIAMOS UM ID UNICO PARA CADA BOTAO*/

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
                card.classList.toggle('card-flipped');
                console.log('Passou aqui');
            }
            
            card.addEventListener('click', function () {    /*CRIAMOS O EVENTO CASO HAJA UM CLICK*/
                card.classList.toggle('card-flipped');      /*ADCIONA OU REMOVE CARD-FLIPPED, SE O ELEMENTO JA TIVER A CLASSE ESSE COMANDO REMOVE E VICE E VERSA*/
                console.log(`Card ${i}${j} clicado!`);      /*MOSTRA NO CONSOLE QUAL CARD FOI CLICADO*/
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
    embaralhaArray(doubleimageCards);                               /*EMBARALHA OS ELEMENTOS DENTRO DO VETOR*/
    distribuiCards(true);                                           /*GERA OS CARDS E MOSTRA NA TELA E MOSTRA PARA MEMORIZAÇÃO = TRUE*/
    await delay(10000);                                             /*AGUARDA 15S SÓ FUNCIONA DENTRO DE FUNÇOES ASSINCRONAS, CORRIGIR ADDEVENTLISTNER("click", async (event))*/
    distribuiCards(false);                                          /*GERA OS CARDS E MOSTRA NA TELA E ESCONDE POR PADRAO DA REGRA DO CSS*/
});
