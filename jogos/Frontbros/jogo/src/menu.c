#ifndef MENU_C
#define MENU_C

#include "raylib.h"
#include "commun.h"
#include "btn.c"
#include "structs.h"
#include "player.c"
#include <stdio.h>

void menu(GameOpt *opt, Player *player){

    DrawTextCenter("FRONT-END BROS.", (Vector2){VW / 2, VH * 0.1}, 64, BLACK, opt->fonte);

    Color marrom_medio = (Color){221, 190, 169, 255};
    Color marrom_escuro = (Color){203, 153, 126, 255};

    // Define os botões
    Btn jogar = {
        "Jogar",
        (Rectangle){VW * 0.6, VH * 0.3, VW * 0.3 , VH * 0.2},
        0.2,
        marrom_escuro,
        marrom_medio,
        BLACK,
        opt->fonte,
        true
    };

    Btn opcoes = {
        "Opções",
        (Rectangle){VW * 0.6, VH * 0.6, VW * 0.3 , VH * 0.2},
        0.2,
        marrom_escuro,
        marrom_medio,
        BLACK,
        opt->fonte,
        true
    };

    Btn display = {
        "",
        (Rectangle){(VW - VW * 0.75) / 2, VH * 0.3, VW * 0.25 , VH * 0.6},
        0.05,
        marrom_escuro,
        marrom_medio,
        BLACK,
        opt->fonte,
        false
    };

    Btn seta_esquerda = {
        "<",
        (Rectangle){(VW - VW * 0.75) / 2 - VW * 0.075, VH * 0.55, VW * 0.05 , VH * 0.1},
        0.2,
        marrom_escuro,
        marrom_medio,
        BLACK,
        opt->fonte,
        true
    };

    Btn seta_direita = {
        ">",
        (Rectangle){(VW - VW * 0.75) / 2 + VW * 0.275, VH * 0.55, VW * 0.05 , VH * 0.1},
        0.2,
        marrom_escuro,
        marrom_medio,
        BLACK,
        opt->fonte,
        true
    };

    // Desenha os botoes na tela
    Btn_desenhar(&jogar);
    //Btn_desenhar(&opcoes);
    Btn_desenhar(&display);
    Btn_desenhar(&seta_esquerda);
    Btn_desenhar(&seta_direita);

    // Verifica os botões clicados
    if(Btn_clicado(&jogar)){
        opt->tela = JOGO_INIT;
    }
    /*
    if(Btn_clicado(&opcoes)){
        opt->tela = OPT;
    }
    */
    if(Btn_clicado(&seta_esquerda)){
        opt->jogador--;
        Player_unload(player);
        *player = Player_init(&opt->jogador);
    }
    if(Btn_clicado(&seta_direita)){
        opt->jogador++;
        Player_unload(player);
        *player = Player_init(&opt->jogador);
    }

    // Desenha o sprite no quadro
    DrawTexturePro(
        player->sprite,
        (Rectangle){0,0, player->box.width, player->box.height},
        display.pos,
        (Vector2){0,0},
        0, WHITE
    );

}

#endif