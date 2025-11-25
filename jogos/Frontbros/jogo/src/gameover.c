#ifndef GAMEOVER_C
#define GAMEOVER_C

#include "raylib.h"
#include "commun.h"
#include "structs.h"
#include "btn.c"

void Gameover_tela(GameOpt *opt){

    opt->cor_fundo = (Color){255, 232, 214, 255};

    Color marrom_medio = (Color){221, 190, 169, 255};
    Color marrom_escuro = (Color){203, 153, 126, 255};

    Btn voltar = {
        "Voltar",
        (Rectangle){VW * 0.35, VH * 0.4, VW * 0.3 , VH * 0.2},
        0.2,
        marrom_escuro,
        marrom_medio,
        BLACK,
        opt->fonte,
        true
    };

    Btn_desenhar(&voltar);

    DrawText("Você perdeu", CentroXTexto("Você perdeu", VW /2, 100, opt->fonte), VH * 0.2, 100, BLACK);

    if(Btn_clicado(&voltar)){
        opt->tela = MENU;
    }

}

#endif