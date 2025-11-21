$(document).ready(function(){
    $('#jogo').on("click", function(){

        const nome = $(this).siblings('h3').text();
        
        // Salva no sessionStorage (dados são apagados quando o navegador fecha)
        sessionStorage.setItem('nomeTransferido', nome);
    
        window.location.href = 'game-page.html';

    });
});
