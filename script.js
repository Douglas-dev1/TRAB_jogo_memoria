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
const container = document.getElementById("cards");             /*ARAMZENA A REFERENCIA DO ELEMENTO DIV COM ID CARDS PARA MANIPULAR A MESMA NO JS*/
/*DUPLAICANDO O ARRAY DE IMAGENS*/
const doubleimageCards = imagesCards.concat(imagesCards);       /*CRIA UM NOVO ARRAY(doubleimageCards) QUE É A COMBINAÇÃO DO ARRAY ORIGINAL(imagesCards.concat) COM O ARRAY QUE É PASSADO COMO PARAMETRO((imagesCards))*/

for(let i =0; i<4; i++){
    for(let j = 0; j<4; j++){
        const card = document.createElement('button');          /*CRIA UM BOTAO E ARAMZENA SUA REFERENCIA EM CONST PARA QUE POSSAMOS MANIPULAR COM JS*/
        card.className = 'cardStyle';                           /*CRIAMOS UM ID PARA ESSE ELEMENTO*/
        card.style.backgroundImage = `url(${doubleimageCards[i * 4 + j]})`; /*STYLE É A PROPRIEDADE QUE PERMITE A MODIFICAÇÃO DOS ESTILOS CSS ATRAVES DE JS, ALTERANDO A IMAGED DE FUNDO A PARTIR DO INDICE DA IMAGEM DO ARRAY CALCULADO PELA EXPRESSÃO(i * 4 + j)*/
        container.appendChild(card);                            /*ADCIONA O ELEMENTO CARD(BOTAO) DENTRO DO ELEMENTO CONTAINER(DIV CADS)*/
    }
}