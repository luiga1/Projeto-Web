
    const container = document.getElementById('container');
    let spanCount = 0; // Um contador para o texto do span

    function addSpan() {
        const newSpan = document.createElement('span');
        spanCount++;
        newSpan.textContent = `Span adicionado: ${spanCount}`;
        container.appendChild(newSpan);
        console.log('Span adicionado!');
    }

    // Adiciona o primeiro span na inicialização
    addSpan();

    window.addEventListener('scroll', () => {
        // Altura total da página (incluindo a parte não visível)
        const documentHeight = document.documentElement.scrollHeight;
        
        // Posição atual do scroll do topo da página
        const scrollPosition = window.scrollY;

        // Altura da janela de visualização do navegador
        const windowHeight = window.innerHeight;

        // Verifica se o usuário chegou próximo ao final da página. 
        // A margem de 50px é para que o novo elemento seja adicionado 
        // um pouco antes do final, evitando que o usuário precise rolar
        // exatamente até o último pixel.
        if (scrollPosition + windowHeight >= documentHeight - 150) {
            addSpan();
        }
    }); 

    /*<div class="coment">
            <div class="coment-head">
                     <div class="user-picture"></div>
                    <div class="user-name"></div>
            </div>
                <div class="user-coment">
                    <span>comentario</span>
                </div>
      </div> 
    */