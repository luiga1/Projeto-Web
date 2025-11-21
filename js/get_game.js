async function modficarDOM(){
    try {
        const nome = sessionStorage.getItem('nomeTransferido');
        if (!nome) {
            console.log('Nenhum nome encontrado no sessionStorage');
            return;
        }

        const dados = await $.getJSON('../json/jogos.json');

        $.each(dados, function(index, item){
            if(item.nome == nome){

                $(".capa-game").attr('src', item['img-vertical']);
                $("#desc").text(item.desc);
                $(".gamef").attr('src', item.link);
                
                console.log('DOM modificado para:', nome);
                return;
            }
        });
        
    } catch (error) {
        console.error("Erro ao modificar DOM:", error);
        window.location.href = 'index.html';
    }
}

modficarDOM();