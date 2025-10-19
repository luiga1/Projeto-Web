function Peca(cor, tipo){
    this.cor = cor
    this.tipo = tipo
}

function iniciarTabuleiro(){

    let tabuleiro = []

    const primeira_linha = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];

    for(let i = 0; i < 8; i++){
        
        let linha = [];

        for(let j = 0; j < 8; j++){

            if(i < 4){
                cor = 'w'
            }else{
                cor = 'b'
            }

            if(i == 0 || i == 7){
                linha.push( new Peca(cor, primeira_linha[j]))
            }else if(i == 1 || i == 6){
                linha.push( new Peca(cor, 'p'))
            }else{
                linha.push('0')
            }

        }

        tabuleiro.push(linha)
    }

    return tabuleiro;

}

function desenharTabuleiro(tabuleiro, div){

    div.innerHTML = '';

    for(linha in tabuleiro){
        for(casa in tabuleiro[linha]){

            let casaAtual = document.createElement('figure');

            casaAtual.classList.add('casa')

            if((parseInt(linha) + parseInt(casa)) % 2 == 0){
                casaAtual.classList.add('branco')
            }else{
                casaAtual.classList.add('preto')
            }
            
            if(tabuleiro[linha][casa] != '0'){
                casaAtual.innerHTML = `<img src="../img/${tabuleiro[linha][casa].cor}-${tabuleiro[linha][casa].tipo}.png">`
            }

            div.appendChild(casaAtual);
        }
    }

}

let tabuleiro;

function iniciarJogo(){

    const tab = document.querySelector('.tabuleiro');

    tabuleiro = iniciarTabuleiro();

    desenharTabuleiro(tabuleiro, tab)
    
    console.log('Jogo resetado');
    
}

document.addEventListener('DOMContentLoaded', () => {

    console.log("Documento carregado");

    iniciarJogo();

})

