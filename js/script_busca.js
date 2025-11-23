document.addEventListener('DOMContentLoaded', main_busca);

function main_busca(){

    const titulo = document.querySelector('#titulo-busca');

    const texto = sessionStorage.getItem('pesquisa');

    if(texto === null){
        titulo.innerText = "Todos os jogos:";
    }else{
        titulo.innerText = `Todos os jogos com a palavra chave ${texto}:`;
    }
}