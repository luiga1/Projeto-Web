function addSpan() {
    const newSpan = document.createElement('span');
    newSpan.textContent = "spam adicionado ";
    container.appendChild(newSpan);
    console.log('Span adicionado!');
}

function addComent() {
    //coment head + span(coment);
    const container = document.getElementById('container');
    const coment = document.getElementById('coments');
    const newDiv = document.createElement('div');
    const comentHead = document.createElement('div');
    const newSpan = document.createElement('span');

    newDiv.className = 'coment'; //define a classe 
    newDiv.id = 'coment'; // define o id da div

    comentHead.className = 'coment-head';
    comentHead.id = 'coment-head';

    //img + spam

    newSpan.textContent = 'comentairio';
    newSpan.className = 'user-coment';

    const nomeUsuario = document.createElement('span'); // cria o nome do usuario
    nomeUsuario.className = 'user-name';
    nomeUsuario.textContent = 'nomezinho safado';

    const uimg = document.createElement('img'); // cria a imagem do comentario
    uimg.src = 'https://i.pravatar.cc/100';
    uimg.alt = 'usuario';
    uimg.className = 'user-picture';

    comentHead.appendChild(uimg);
    comentHead.appendChild(nomeUsuario);

    // agr cria a div maior do comentario

    newDiv.appendChild(comentHead); // cria uma div q tem o nome e img
    newDiv.appendChild(newSpan); // cria uma div q tenha o comentario

    coment.appendChild(newDiv);
    console.log('comentario adicionado!');

}

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
        addComent();
    }
});

/**
 <div class="coment">
                    <div class="coment-head">
                        <div class="user-picture"><img src="../imagens/free-user-icon-svg.webp"></div> <!--src="https://i.pravatar.cc/50"-->
                        <div class="user-name"><span>nome completo da silva</span></div>
                    </div>

                    <div class="user-coment">
                        <span>comentario complexo sobre o jogo</span>
                    </div>

                </div>
 */

/**
 * function addComenthead(name){
    const newDiv = document.createElement('div');
    newDiv.className = 'coment-head'; //define a classe 
    newDiv.id = 'coment-head'; // define o id da div

    const img = document.createElement('img'); // cria a imagem do comentario
    img.src = '../imagens/free-user-icon-svg.webp';
    img.alt = usuario;
    img.className = 'user-picture';

    const nomeUsuario = document.createElement('span');
    nomeUsuario.className = 'user-name';
    nomeUsuario.textContent = name;

    newDiv.appendChild(img);
    newDiv.appendChild(nomeUsuario);
    console.log('nome e imagem adicionado');

}
 
 */