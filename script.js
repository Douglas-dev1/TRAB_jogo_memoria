/*==================== VARIAVEIS(CONST) ====================*/
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
const mensagemElement = document.getElementById('mensagem');        /*ARAMZENA A REFERENCIA DO ELEMENTO DIV COM ID MENSAGEM PARA MANIPULAR A MESMA NO JS*/
const mensagemElement1 = document.getElementById('mensagem2');      /*ARAMZENA A REFERENCIA DO ELEMENTO DIV COM ID MENSAGEM1 PARA MANIPULAR A MESMA NO JS*/
const buttonRadon = document.getElementById("randon")               /*ARAMZENA A REFERENCIA DO ELEMENTO BUTTON COM ID RANDON PARA MANIPULAR A MESMA NO JS*/
/*==========================================================*/
/*===================== VARIAVEIS(LET) =====================*/
let mensagemFinal1 = null;
let Carta1 = null;
let Carta2 = null;
let bloqCarta = null;
let contador = null
let pontos = null;
let endgame = null;
let tempoRestante = 90;
let cronometro = null;
/*==========================================================*/
function delay(ms) {                                                /*FUNÇÃO DE DELAY*/
    return new Promise(resolve => setTimeout(resolve, ms))
}
/*==================== INIT ====================*/

distribuiCards();/*INICIA DISTRIBUINDO OS CARDS*/

/*==============================================*/

function distribuiCards(mostrarCartas = false) {
    container.innerHTML = '';                                               /*PARA LIMPAR O CONTAINER*/

    for (let i = 0; i < 4; i++) {                                           /*CRIANDO E DISTRIBUINDO OS CARDS*/
        for (let j = 0; j < 4; j++) {
            const card = document.createElement('div');                     /*CRIA UM BOTAO E ARAMZENA SUA REFERENCIA EM CONST PARA QUE POSSAMOS MANIPULAR COM JS*/
            card.className = 'cardStyle';                                   /*CRIAMOS UM ID PARA ESSE ELEMENTO*/
            card.id = `card${i}${j + 1}`;                                   /*CRIAMOS UM ID UNICO PARA CADA BOTAO*/

            /*CRIA O CORPO DO CARD*/
            const corpoCard = document.createElement('div');                    /*CRIA A DIV*/
            corpoCard.className = 'cCard';                                      /*NOMEIA A CLASSE*/
            /*CRIA A FRENTE DO CARD E ATRIBUI A IMAGEM*/
            const frenteCard = document.createElement('div');                   /*CRIA DIV*/
            frenteCard.className = 'fCard'                                      /*NOMEIA CLASSE*/
            frenteCard.style.backgroundImage = 'url("assets/versoCard.jpg")';   /*ATRIBUI A IMAGEM DE FUNDO */
            /*CRIA O VERSO DO CARD E ATRIBUI A IMAGEM*/
            const versoCard = document.createElement('div');                            /*CRIA A DIV*/
            versoCard.className = 'vCard'                                               /*NOMEIA A CLASSE*/
            versoCard.style.backgroundImage = `url(${doubleimageCards[i * 4 + j]})`;    /*ATRIBUI A IMAGEM ITERANDO ENTRE OS ITENS DO VETOR E ATRIBUINDO*/
            /*GUARDAMOS FRENTE E VERSO DO CARD NO CORPO DE CAR*/
            corpoCard.appendChild(frenteCard);
            corpoCard.appendChild(versoCard);
            /*GUARDAMOS CORPOCARD EM CARD*/
            card.appendChild(corpoCard);

            if (mostrarCartas) { /*QUANDO O PARAMETRO É TRUE IRA PASSAR POR AQUI E MUDAR A IMAGEM DAS CARTAS*/
                card.classList.add('card-flipped')                              /*ADCIONA O EFEITO DE FLIP E VIRA A CARTA*/
                console.log('Passou aqui');                                     /*PARA DEBUG, IMPRIME NO CONSOLE*/
            }

            card.addEventListener('click', function () {                        /*CRIAMOS O EVENTO CASO HAJA UM CLICK*/
                if (!bloqCarta && !card.classList.contains('card-flipped')) {   /*CONDIÇÃO PARA BLOQUEAR O CLIQUE EM UMA TERCEIRA CARTA, SE AS DUAS JA ESTIVEREM VIRADAS*/
                    card.classList.add('card-flipped');                         /*ADCIONA OU REMOVE CARD-FLIPPED, SE O ELEMENTO JA TIVER A CLASSE ESSE COMANDO REMOVE E VICE E VERSA*/
                    verificaCartas(card);                                       /*CHAMA A FUNÇÃO DE VERIFICAÇÃO DA CARTA E COMO PARAMETRO A CARTA ATUAL*/
                    console.log(`Card ${i}${j + 1} clicado!`);                  /*PARA DEBUG, IMPRIME NO CONSOLE*/
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

/*EVENTO DE CLIQUE NO BOTÃO EMBARALHAR*/
buttonRadon.addEventListener("click", async (event) => {
    event.preventDefault();
    pontos = 0;                                                             /*ZERA OS PONTOS AO INICIAR O GAME*/
    endgame = false;                                                        /*LIBERA O CONTADOR PAR AUMA NOVA CONTAGEM*/
    tempoRestante = 90;                                                     /*EM CASO DE UM NOVO JOGO RECARREGA O CONTADOR*/
    bloqCarta = false;                                                      /*EM CASO DE UM NOVO JOGO DESBLOQUEIA AS AÇOES DAS CARTAS */
    mensagemElement.innerText = 'Iniciado!';                                /*EXIBE A MENSAGEM QUE O JOGO FOI INCIADO*/
    document.getElementById('mensagem1').innerText = `pontos: ${pontos}`;   /*EXIBE A PONTUAÇÃO*/
    embaralhaArray(doubleimageCards);                                       /*EMBARALHA OS ELEMENTOS DENTRO DO VETOR*/
    distribuiCards(true);                                                   /*GERA OS CARDS E MOSTRA NA TELA E MOSTRA PARA MEMORIZAÇÃO = TRUE*/
    await delay(5000);                                                      /*AGUARDA 15S SÓ FUNCIONA DENTRO DE FUNÇOES ASSINCRONAS, CORRIGIR ADDEVENTLISTNER("click", async (event))*/
    distribuiCards(false);                                                  /*GERA OS CARDS E MOSTRA NA TELA E ESCONDE POR PADRAO DA REGRA DO CSS*/
    initTemporizador()                                                      /*INCIA O CONTADOR*/
});

function verificaCartas(card) {
    if (!Carta1) {                      /*SE NAO HOUVER NNEHUMA CARTA SALVA EM CARTA1*/
        Carta1 = card;                  /*SALVA O CONTEUDO DE card EM CARD1*/
    }
    else if (!Carta2) {                 /*SE NAO HOUVER NNEHUMA CARTA SALVA EM CARTA2*/
        Carta2 = card;                  /*SALVA O CONTEUDO DE card EM CARD2*/
        bloqCarta = true;               /*TRAVAMENTO PARA NAO CLICAR EMMAIS DE DUAS CARTAS*/
        /*MOSTRA AS CARTAS DURANTE 1 SEGUNDO ANTES DE COMPARAR*/
        setTimeout(() => {
            comparaCartas()             /*CHAMA A FUNÇÃO QEU COMPRARA CARTAS*/
        }, 1000)                        /*AGUARDA 1 SEC*/
    }
}

function comparaCartas() {
    /*ACESSAMOS OS ENDEREÇOS DAS DUAS IMAGENS DAS CARTAS CLICADAS E SALVAMOS EM VARIAVEIS TEMPORARIAS PARA PODERMOS COMPARAR*/
    const imagemCarta1 = Carta1.querySelector('.vCard').style.backgroundImage;  /*SALVA URL DA IMAGEM NA VARIAVEL*/
    const imagemCarta2 = Carta2.querySelector('.vCard').style.backgroundImage;

    if (imagemCarta1 === imagemCarta2) {
        /*MANTÉM AS CARTAS*/
        Carta1.innerHTML;
        Carta2.innerHTML;
        /*OCULTA AS CARTAS IGUAIS*/
        /*
        Carta1.style.visibility = 'hidden';         //ESCONDE AS CARTAS
        Carta2.style.visibility = 'hidden';
        */
        console.log('Cartas iguais!');              /*PARA DEBUG, IMPRIME NO CONSOLE*/
        pontos++;                                   /*CONTA PONTOS*/
        document.getElementById('mensagem1').innerText = `pontos: ${pontos}`;       /*MOSTRA A MENSAGEM COM OS SEGUNDOS FORMATADOPS NA TELA*/
        if (pontos == 8) {                                                          /*JOGO COMPLETO*/
            bloqueioClick = true;                                                   /*BLOQUEIA PARA NOVOS CLIQUES*/
            pausarTemporizador();                                                   /*PAUSA A CONTAGEM DO TEMPORIZADOR DE 902*/
            mensagemElement.innerText = 'Ganhou!';                                  /*MOSTRA A MENSAGEM NA TELA*/
            console.log(endgame)                                                    /*PARA DEBUG, IMPRIME NO CONSOLE*/
        }
    }
    else {
        Carta1.classList.remove('card-flipped');                                    /*REMOVE O EFEITO DE FLIP E DESVIRA A CARTA*/
        Carta2.classList.remove('card-flipped');
        console.log('Cartas Diferentes!');
    }
    Carta1 = null                                                                   /*RESETA AS VARIAVEIS*/
    Carta2 = null
    bloqCarta = null
}

function initTemporizador() {
    if (endgame === false) {                                    /*TRAVA O CONTADOR */
        cronometro = setInterval(() => {                        /*TIMER*/
            tempoRestante--;                                    /*DECREMENTA DOS 60S*/
            document.getElementById('temp').innerText = `Tempo restante: ${tempoRestante}s`; /*PARA MOSTRARMOS O TEMPO*/

            /*VERIFICA O TEMPO*/
            if (tempoRestante <= 0) {                               /*TEMPO ESGOTADO*/
                clearInterval(cronometro);                          /*PARA O CRONOMETRO*/
                bloqueioClick = true;                               /*BLOQUEIA PARA NOVOS CLIQUES*/
                mensagemElement.innerText = 'Tempo esgotado!';      /*EXIBE A MENSAGEM TEMPO ESGOTADO */
            }
        }, 1000);                                                   /*TIMER DE 1 SEGUNDO*/
    }
}

function pausarTemporizador() {
    clearInterval(cronometro);  /*PARA O CRONOMETRO*/
    endgame = true;             /*SETA VARIAVEL PARA TRAVAR O CONTADOR*/
}