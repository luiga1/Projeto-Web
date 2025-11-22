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

    if(largura > 670){
        document.querySelector("#titulo").innerText = "Old School Games";
    }else{
        document.querySelector("#titulo").innerText = "OSG";
    }
}

document.addEventListener("DOMContentLoaded", tamanho_titulo);

window.addEventListener("resize", tamanho_titulo);

function abrir_jogo(nome){

    sessionStorage.setItem('nomeTransferido', nome);
    
    window.location.href = 'game-page.html';
}
