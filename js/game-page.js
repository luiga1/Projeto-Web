function addSpan() {
    const newSpan = document.createElement('span');
    newSpan.textContent = "spam adicionado ";
    container.appendChild(newSpan);
    console.log('Span adicionado!');
}

function renderizarCard(nome, mensagem, idAvatar) {
    //coment head + span(coment);
    const lista = document.getElementById('commentList');
    const card = document.createElement('div');

    //cria um elemento novo
    card.classList.add('comment-card');

    const avatarId = idAvatar || Math.floor(Math.random() * 1000);

    //usa o link da api e coloca o avatar id para manter o mesmo
    const avatarUrl = 'https://avatar.iran.liara.run/public?v=${avatarId}';

    const dataAtual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    card.innerHTML = `
    <img src="${avatarUrl}" class="avatar" alt="Avatar">
    <div class="comment-content">
      <h4>${nome} <span class="date-posted">às ${dataAtual}</span></h4>
      <p>${mensagem}</p>
    </div>
  `;

  //adiciona no topo dos comentarios
    lista.prepend(card);
}


// --- NOVA FUNÇÃO PARA BUSCAR O ARQUIVO ---
async function carregarComentariosDoArquivo() {
    try {
      // 1. O fetch vai "buscar" o arquivo
      const resposta = await fetch('/json/comentarios.json');
      
      // 2. Convertemos a resposta para JSON "legível" pelo JS
      const dados = await resposta.json();
  
      // 3. Inverter ordem para o mais recente visualmente ficar por último na iteração
      const dadosInvertidos = dados.reverse();
  
      // 4. Para cada item do JSON, desenhamos o card
      dadosInvertidos.forEach(item => {
        renderizarCard(item.nome, item.mensagem, item.id);
      });
  
    } catch (erro) {
      console.error("Erro ao carregar o JSON:", erro);
      alert("Não foi possível carregar os comentários. Você está usando um servidor local?");
    }
  }
  
  // Inicia tudo quando a página carregar
  

function adicionarComentario() {
    // 1. Pegar os valores
    const nome = document.getElementById('nameInput').value;
    const mensagem = document.getElementById('messageInput').value;
    const lista = document.getElementById('commentList');

    // Validação simples
    if (nome === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // 2. Criar o elemento do comentário (Card)
    const card = document.createElement('div');
    card.classList.add('comment-card');

    // um numero aleatorio é gerado para ser diferente toda vez
    const randomId = Math.floor(Math.random() * 1000);
    const avatarUrl = `https://avatar.iran.liara.run/public?v=${randomId}`;

    // Pegar a hora atual
    const dataAtual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 3. Montar o HTML interno do card
    // Usamos Template Strings (essas crases ``) para facilitar
    card.innerHTML = `
      <div class="avatar-placeholder">${inicial}</div>
      <div class="comment-content">
        <h4>${nome} <span class="date-posted">às ${dataAtual}</span></h4>
        <p>${mensagem}</p>
      </div>
    `;

    // 4. Adicionar na lista (no topo)
    lista.prepend(card);

    // 5. Limpar os campos
    document.getElementById('nameInput').value = "";
    document.getElementById('messageInput').value = "";
}

window.onload = carregarComentariosDoArquivo;