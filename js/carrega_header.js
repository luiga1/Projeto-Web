document.addEventListener("DOMContentLoaded", () => {

    // Função genérica para carregar componentes externos
    function carregarComponente(containerId, arquivo, seletor) {
        const container = document.getElementById(containerId);

        // Tenta buscar via fetch (funciona se rodar em http:// ou https://)
        fetch(arquivo)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao carregar: " + arquivo);
                }
                return response.text();
            })
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, "text/html");

                const elemento = doc.querySelector(seletor);
                if (elemento) {
                    container.innerHTML = elemento.outerHTML;
                } else {
                    console.error(`Nenhum ${seletor} encontrado em ${arquivo}`);
                }
            })
            .catch(error => {
                console.warn("Fetch falhou, tentando alternativa sem servidor...");

                // Alternativa usando XMLHttpRequest (funciona mesmo em file://)
                const xhr = new XMLHttpRequest();
                xhr.open("GET", arquivo, true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(xhr.responseText, "text/html");

                        const elemento = doc.querySelector(seletor);
                        if (elemento) {
                            container.innerHTML = elemento.outerHTML;
                        } else {
                            console.error(`Nenhum ${seletor} encontrado em ${arquivo}`);
                        }
                    }
                };
                xhr.send();
            });
    }

    // Carrega o cabeçalho (pega a tag <header> de cabecalho.html)
    carregarComponente("cabecalho", "cabecalho.html", "header");

    // Carrega o aside (pega a tag <aside> de aside.html)
    carregarComponente("aside", "aside.html", "aside");

    carregarComponente("footer", "rodape.html", "footer");

    
});

function tamanho_titulo(){
    let largura = window.innerWidth;

    const titulo = document.getElementById("titulo");
    if (titulo === null) return;

    if(largura > 670){
        titulo.innerText = "Old School Games";
    }else{
        titulo.innerText = "OSG";
    }

}

function main(){
    tamanho_titulo()

    const barra = document.querySelector('#pesquisa')


    barra.addEventListener("keydown", (e)=>{
        if(e.key !== 'Enter')return;

        const texto = barra.value;

        sessionStorage.setItem('pesquisa', texto);

        window.location.href = 'index_busca.html'
    })
    
    
}

function abrir_jogo(nome){

    sessionStorage.setItem('nomeTransferido', nome);
    
    window.location.href = 'game-page.html';
}


window.addEventListener("resize", tamanho_titulo);
document.addEventListener("click", main, {once: true});
