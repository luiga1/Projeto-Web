$(document).ready(function(){
  carregarComentariosDoArquivo();

  $("#comment-add").on("click",adicionarComentario);
});


function renderizarCard(nome, mensagem, idAvatar) {

    const avatarId = idAvatar || Math.floor(Math.random() * 1000);

    //usa o link da api e coloca o avatar id para manter o mesmo
    const avatarUrl = `https://avatar.iran.liara.run/public?v=${avatarId}`;

    const dataAtual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    //cria a variavel do comentario html
    const cardHtml = `
        <div class="comment-card">
            <img src="${avatarUrl}" class="avatar" alt="Avatar">
            <div class="comment-content">
                <h4>${nome} <span class="date-posted">às ${dataAtual}</span></h4>
                <p>${mensagem}</p>
            </div>
        </div>
    `;

    // cria a div maior
    const $novoCard = $(cardHtml).hide();

    $('#commentList').prepend($novoCard);

    //efeito de aparecer na nova div
    $novoCard.fadeIn(800);
}

//função assincrona para carregar os comentarios assim que pegar o json
async function carregarComentariosDoArquivo() {
    try {
        // Usando jQuery com await
        const dados = await $.getJSON('../json/comentarios.json');
        
        // Inverter ordem
        const dadosInvertidos = dados.reverse();

        // Para cada item do JSON, desenhamos o card
        $.each(dadosInvertidos, function(index, item) {
            renderizarCard(item.nome, item.mensagem, item.id);
        });

    } catch (erro) {
        console.error("Erro ao carregar o JSON:", erro);
        alert("Não foi possível carregar os comentários. Você está usando um servidor local?");
    }
}
  
// Adicionar o comentarios criados pelos usuarios
function adicionarComentario() {
    //Pegar os valores
    const nome = $("#nameInput").val();
    const mensagem = $("#messageInput").val();

    // validação simples
    if (!nome || !mensagem) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // um numero aleatorio é gerado para ser diferente toda vez
    const randomId = Math.floor(Math.random() * 1000);
    renderizarCard(nome,mensagem,randomId);

    $("#nameInput").val("");
    $("#messageInput").val();
}
