const div = '#div_principal'

function verifica_tamanho(){
    let largura = window.innerWidth;

    if(largura < 1050){
        esconde_aside()
    }else{
        const aside = document.querySelector('aside');

        aside.style.display = 'flex';

        if(largura < 1050){
            document.querySelector(div).style.marginLeft = '20px';
        }else{
            document.querySelector(div).style.marginLeft = '260px';
        }

        //console.log("Aside mostrado");
    }
}


function esconde_aside(){

    document.querySelector('aside').style.display = 'none';

    document.querySelector(div).style.marginLeft = '20px';

    //console.log("Aside escondido");
}

function mostrar_aside(){

    let largura = window.innerWidth;

    const aside = document.querySelector('aside');

    if(window.getComputedStyle(aside).getPropertyValue('display') == 'none'){

        aside.style.display = 'flex';

        if(largura < 1050){
            document.querySelector(div).style.marginLeft = '20px';
        }else{
            document.querySelector(div).style.marginLeft = '260px';
        }

        console.log("Aside mostrado");

    }else{
        esconde_aside();
    }
}

document.addEventListener("DOMContentLoaded", verifica_tamanho);
window.addEventListener('resize', verifica_tamanho);
