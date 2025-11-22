function verifica_tamanho(){
    let largura = window.innerWidth;

    if(largura < 1050){
        esconde_aside()
    }else{
        const aside = document.querySelector('aside');

        aside.style.display = 'flex';

        if(largura < 1050){
            document.querySelector('.principal').style.gridTemplateColumns = '10px 1fr'
        }else{
            document.querySelector('.principal').style.gridTemplateColumns = '240px 1fr'
        }

        //console.log("Aside mostrado");
    }
}

function esconde_aside(){

    document.querySelector('aside').style.display = 'none';

    document.querySelector('.principal').style.gridTemplateColumns = '10px 1fr'

    //console.log("Aside escondido");
}

function mostrar_aside(){

    let largura = window.innerWidth;

    const aside = document.querySelector('aside');

    if(window.getComputedStyle(aside).getPropertyValue('display') == 'none'){

        aside.style.display = 'flex';

        if(largura < 1050){
            document.querySelector('.principal').style.gridTemplateColumns = '10px 1fr'
        }else{
            document.querySelector('.principal').style.gridTemplateColumns = '240px 1fr'
        }

        console.log("Aside mostrado");

    }else{
        esconde_aside();
    }
}

document.addEventListener('DOMContentLoaded', verifica_tamanho);
window.addEventListener('resize', verifica_tamanho);