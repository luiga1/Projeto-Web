class Peca{

    constructor(cor, tipo){
        this.cor = cor
        this.tipo = tipo
        this.selecionado = false;
    }
}

class Tabuleiro{

    constructor(contanier, verbose){
        // Guarda a divi mão onde vai ficar o tabuleiro
        this.div = contanier

        this.verbose = verbose

        this.pecaSelecionada = null

        this.jogadorAtual = 'w'

        this.pecas = this.iniciarTabuleiro()

        this.carregarPecas()

        if(verbose){
            console.log("Tabuleiro criado")
        }
    }

    iniciarTabuleiro(){

       /*
        Inicia a matriz que guarda as pecas do tabuleiro
       */

        let tabuleiro = []

        const primeira_linha = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];

        for(let i = 0; i < 8; i++){
            
            let linha = [];

            for(let j = 0; j < 8; j++){

                let cor;

                if(i > 4){
                    cor = 'w'
                }else{
                    cor = 'b'
                }

                if(i == 0 || i == 7){
                    linha.push(new Peca(cor, primeira_linha[j]))
                }else if(i == 1 || i == 6){
                    linha.push(new Peca(cor, 'p'))
                }else{
                    linha.push(null)
                }

            }

            tabuleiro.push(linha)
        }

        return tabuleiro;

    }

    carregarCasas(){

        /*
            Carrega as casas no DOM, elas podem ser brancas, pretas ou verdes onde uma peça pode movimentar
        */

        let mapaMovimento = this.gerarMapaMovimentos(this.pecaSelecionada);

        for(let i = 0; i< 8; i++){
            for(let j = 0; j < 8; j++){

                let row = parseInt(i)
                let col = parseInt(j)

                let casaAtual = this.div.children[row * 8 + col]

                if(typeof casaAtual !== 'undefined'){

                    casaAtual.classList = ''

                }else{
                    casaAtual = document.createElement('figure');

                    casaAtual.id = `${i}${j}`

                    this.div.appendChild(casaAtual); 
                }

                casaAtual.classList.add('casa')

                if(mapaMovimento[row][col]){
                    casaAtual.classList.add('possivel_movimento')
                }else if((row + col) % 2 == 0){
                    casaAtual.classList.add('branco')
                }else{
                    casaAtual.classList.add('preto')
                }

            }
        }
        

    }

    carregarPecas(){

        /**
         * Carrega as imagens das peças no DOM
         */

        this.carregarCasas()

        let i = 0
        for(let linha in this.pecas){
            for(let casa in this.pecas[linha]){

                let casas = this.div.children;
                
                if(this.pecas[linha][casa] != null){
                    casas[i++].innerHTML = `<img src="../img/${this.pecas[linha][casa].cor}-${this.pecas[linha][casa].tipo}.png" alt="${linha}${casa}${this.pecas[linha][casa].cor}${this.pecas[linha][casa].tipo}">`
                }else{
                    casas[i++].innerHTML = ''
                }

            }
        }
    }

    selecionarPeca(peca){

        /**
         * É chamado quando o usuário clica em uma peça para seleciona-la,
         * é verificado se essa seleção é válida
         */

        if(peca.localName == 'img' && this.jogadorAtual == peca.alt[2]){
            let alt = peca.alt;

            this.pecaSelecionada = {row: parseInt(alt[0]), col: parseInt(alt[1]), cor: alt[2], tipo: alt[3]}
            
        }else{
            this.pecaSelecionada = null;
        }

        this.carregarCasas()
    }

    gerarMapaMovimentos(peca){

        // Gera um mapa de movimentos para cada possível peça
        const tab = this.pecas

        let mapa = []
        for(let i = 0; i < 8; i++){
            mapa[i] = []
            for(let j = 0; j < 8; j++){
                mapa[i][j] = false;
            }
        }
        
        if(peca == null){
            return mapa
        }

        let i, j, k, l;

        switch(peca.tipo){

            // Peão
            case 'p':
                if(peca.cor == 'w'){

                    if(lerCor(peca.row-1, peca.col, tab) == null){
                        mapa[peca.row - 1][peca.col] = true;

                        if(lerCor(peca.row-2, peca.col, tab) == null && peca.row == 6){
                            mapa[peca.row - 2][peca.col] = true;
                        }
                    }

                    if(lerCor(peca.row-1, peca.col-1, tab) == 'b'){
                        mapa[peca.row - 1][peca.col - 1] = true;
                    }

                    if(lerCor(peca.row-1, peca.col+1, tab) == 'b'){
                        mapa[peca.row - 1][peca.col + 1] = true;
                    }

                }
                else{

                    if(lerCor(peca.row+1, peca.col, tab) == null){
                        mapa[peca.row + 1][peca.col] = true;

                        if(lerCor(peca.row+2, peca.col, tab) == null && peca.row == 1){
                            mapa[peca.row + 2][peca.col] = true;
                        }
                    }

                    if(lerCor(peca.row+1, peca.col-1, tab) == 'w'){
                        mapa[peca.row + 1][peca.col - 1] = true;
                    }

                    if(lerCor(peca.row+1, peca.col+1, tab) == 'w'){
                        mapa[peca.row + 1][peca.col + 1] = true;
                    }

                }
                break;
            // Torre
            case 'r':
            
                i = peca.row + 1;
                while(i < 8 && lerCor(i, peca.col, tab) !== this.jogadorAtual && (peca.row + 1 == i || lerCor(i - 1, peca.col, tab) === null)){
                    mapa[i][peca.col] = true;
                    i++;
                }

                i = peca.row - 1;
                while(i >= 0 && lerCor(i, peca.col, tab) !== this.jogadorAtual && (peca.row - 1 == i || lerCor(i + 1, peca.col, tab) === null)){
                    mapa[i][peca.col] = true;
                    i--;
                }

                j = peca.col + 1;
                while(j < 8 && lerCor(peca.row, j, tab) !== this.jogadorAtual && (peca.col + 1 == j || lerCor(peca.row, j - 1, tab) == null)){
                    mapa[peca.row][j] = true;
                    j++;
                }
                
                j = peca.col - 1;
                while(j >= 0 && lerCor(peca.row, j, tab) !== this.jogadorAtual && (peca.col - 1 == j || lerCor(peca.row, j + 1, tab) == null)){
                    mapa[peca.row][j] = true;
                    j--;
                }
                break;

            // Bispo
            case 'b':
                
                let combinacoes = [1, -1]

                for(k in combinacoes){
                    for(l in combinacoes){
                        i = peca.row + combinacoes[k];
                        j = peca.col + combinacoes[l];

                        while(j < 8 && i < 8 && j >= 0 && i >= 0 && lerCor(i, j, tab) !== this.jogadorAtual && (peca.col + combinacoes[l] == j || lerCor(i - combinacoes[k], j - combinacoes[l], tab) == null)){
                            mapa[i][j] = true;
                            i += combinacoes[k];
                            j += combinacoes[l];
                        }
                    }
                }

                break;


            // Rainha
            // Junção dos mapas da torre e bispo
            case 'q':

                let mapa_bispo = this.gerarMapaMovimentos({row: peca.row, col: peca.col, cor: peca.cor, tipo: 'b'})
                let mapa_torre = this.gerarMapaMovimentos({row: peca.row, col: peca.col, cor: peca.cor, tipo: 'r'})

                // Unindo os mapas
                for(let line in mapa){
                    for(let cell in mapa[line]){
                        if(mapa_bispo[line][cell] || mapa_torre[line][cell]){
                            mapa[line][cell] = true;
                        }else{
                            mapa[line][cell] = false;
                        }
                    }
                }

                break;

            // Rei
            case 'k':

                let possibilidades = [-1, 0, 1]

                for(k in possibilidades){
                    for(l in possibilidades){
                        i = peca.row + possibilidades[k];
                        j = peca.col + possibilidades[l];
                        if(lerCor(i, j, this.pecas) !== this.jogadorAtual && i >= 0 && j >=0 && i < 8 && j < 8 && (possibilidades[k] != 0 || possibilidades[l] != 0)){
                            mapa[i][j] = true;
                        }
                    }
                }

                break;

            // Cavalo
            case 'n':

                let possib = [1, -1, 2, -2]

                for(k in possib){
                    for(l in possib){
                        i = peca.row + possib[k];
                        j = peca.col + possib[l];
                        if(lerCor(i, j, this.pecas) !== this.jogadorAtual && i >= 0 && j >=0 && i < 8 && j < 8 && Math.abs(possib[k]) !== Math.abs(possib[l])){
                            mapa[i][j] = true;
                        }
                    }
                }

                break;
        }

        return mapa;
    }

}

function lerCor(row, col, tab){

    if(row < 0 || col < 0 || row >= 8 || col >= 8){
        return null
    }

    if(tab[row][col] == null){
        return null
    }

    return tab[row][col].cor
}

function inserirPeca(tabuleiro){

    /**
     * Apenas para debug
     */

    const divTeste = document.querySelector('#teste');

    divTeste.innerHTML = `
    <label for="row">Linha: </label>
    <input type="number" name="row" id="row">
    <label for="col">Coluna: </label>
    <input type="number" name="col" id="col">
    <label for="tipo">Tipo: </label>
    <input type="text" name="tipo" id="tipo">
    <label for="cor">Cor: </label>
    <input type="text" name="cor" id="cor">

    <button id="enviar">Adicionar peça</button>`;

    const botao = document.querySelector('#enviar');

    botao.addEventListener('click', () =>{

        let row = document.querySelector('#row').value;
        let col = document.querySelector('#col').value;
        let tipo = document.querySelector('#tipo').value;
        let cor = document.querySelector('#cor').value;

        row = parseInt(row)
        col = parseInt(col)

        if(tipo == 'null'){
            tabuleiro.pecas[row][col] = null;
        }else{
            tabuleiro.pecas[row][col] = new Peca(cor, tipo);
        }

        tabuleiro.carregarPecas();
    })
}

document.addEventListener('DOMContentLoaded', () => {

    iniciarJogo();

})

function iniciarJogo(){

    const tabuleiro = new Tabuleiro(document.querySelector('.tabuleiro'), true);

    // É chamado quando alguém clica no tabuleiro
    tabuleiro.div.addEventListener('click', (e) =>{

        tabuleiro.selecionarPeca(e.target)
    })

    inserirPeca(tabuleiro)

}

