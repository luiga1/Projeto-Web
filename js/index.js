let pos_carrocel;
let Listajogos = [];

async function carregaListaJogos(){
    try {
        const resposta = await fetch('../json/jogos.json');
        if (!resposta.ok) throw new Error(`HTTP error ${resposta.status}`);
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error("Erro ao carregar o JSON:", erro);
        return [];
    }
}

function carregaJogos(){

    let div = document.querySelector('.carrocel-inferior');

    for(let i = 0; i < Listajogos.length; i++){
        const jogoAtual = Listajogos[i];
        
        const urlImg = jogoAtual["img-vertical"] || '';

        div.innerHTML += `
            <article class="ci-jogos">
                <div class="ci-imagem" style="background-image: url('${urlImg}');"></div>
                <span class="ci-titulo"><h3>${jogoAtual["nome"]}</h3></span>
                <button class="ci-btn" id="jogo"><h3>Jogar</h3></button>
            </article>
        `
    }

}

function carregaCarrocel(){
    const carrocel_img = document.querySelectorAll('.img-jogos');
    const carrocel_titulos = document.querySelectorAll('.carrocel-titulos');
    const qtd_jogos = Listajogos.length;

    for (let i = 0; i < carrocel_img.length; i++) {

        const idx = ((pos_carrocel + i) % qtd_jogos + qtd_jogos) % qtd_jogos;
        const jogoAtual = Listajogos[idx];

        const urlImg = jogoAtual["img-horizontal"] || '';
        carrocel_img[i].style.backgroundImage = urlImg ? `url('${urlImg}')` : '';

        carrocel_titulos[i].innerHTML = jogoAtual["nome"];
    }
}

function avancarCarrocel() {
    pos_carrocel++;
    carregaCarrocel();
}
function voltarCarrocel() {
    pos_carrocel--;
    carregaCarrocel();
}

document.addEventListener('DOMContentLoaded', async () => {
    pos_carrocel = 0;

    Listajogos = await carregaListaJogos();

    carregaCarrocel();

    carregaJogos();
});
