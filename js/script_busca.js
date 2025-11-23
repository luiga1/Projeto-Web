document.addEventListener('DOMContentLoaded', main_busca);

function main_busca(){

    const titulo = document.querySelector('#titulo-busca');

    const texto = sessionStorage.getItem('pesquisa');

    if(texto === null){
        titulo.innerText = "Todos os jogos:";
        return
    }else{
        titulo.innerText = `Todos os jogos com a palavra chave "${texto}":`;
    }

    carrega_jogos(texto);
}

function abrir_jogo_pesquisa(nome_jogo){
    sessionStorage.setItem('nomeTransferido', nome_jogo);
    
    window.location.href = 'game-page.html';
}

async function carrega_jogos(texto) {
    
    const resposta = await fetch('../json/jogos.json');
    const dados = await resposta.json();

    const jogos_filtrados = dados.filter(item => item["nome"].toLowerCase().includes(texto.toLowerCase().trim()));

    const div = document.querySelector('.lista-jogos-busca')

    jogos_filtrados.forEach(jogo => {
        console.log(jogo)

        div.innerHTML += `
            <article>  
                <div class="fundo-jogo-busca" style="background-image: url(${jogo["img-vertical"] || ''})"></div>
                <div class="texto-jogo-busca">
                    <h3>${jogo["nome"]}</h3>
                    <p>Criado por ${jogo["criador"] || ''}</p>
                    <p><b>Descrisção:</b> ${jogo["desc"] || ''}</p>
                    <Button onclick="abrir_jogo_pesquisa('${jogo["nome"] || ''}')">Jogar</Button>
                </div>
            </article>
        `
    });
}