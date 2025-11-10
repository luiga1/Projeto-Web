// TODO: Resolver bug de tamanho quando a janela muda de tamanho

function esconde_aside(){

    document.querySelector('aside').style.display = 'none';

    document.querySelector('main').style.marginLeft = '20px';

    console.log("Aside escondido");
}

function mostrar_aside(){

    let largura = window.innerWidth;

    const aside = document.querySelector('aside');

    if(window.getComputedStyle(aside).getPropertyValue('display') == 'none'){

        aside.style.display = 'flex';

        if(largura < 790){
            document.querySelector('main').style.marginLeft = '20px';
        }else{
            document.querySelector('main').style.marginLeft = '260px';
        }

        console.log("Aside mostrado");

    }else{
        esconde_aside();
    }
}