#ifndef GAME_C
#define GAME_C

#include "raylib.h"
#include <stdio.h>
#include "structs.h"
#include "jogo.c"
#include "menu.c"
#include "gameover.c"

GameOpt initGame(){

    GameOpt opcoes;

    opcoes.tela = 0;
    opcoes.jogador = 2;
    opcoes.fonte = GetFontDefault();
    opcoes.cor_fundo = (Color){255, 232, 214, 255};
    opcoes.ignore_input_until = GetTime() + 0.25;
    opcoes.jogo = Jogo_init(&opcoes);

    return opcoes;
}

void updateGame(GameOpt *opt){

}

void drawGame(GameOpt *opt){

    ClearBackground(opt->cor_fundo);

    //DrawFPS(100, 100);

    switch(opt->tela){

        case JOGO_INIT:
            opt->jogo = Jogo_init(opt);
            opt->tela = JOGO;
        break;

        case JOGO:
            Jogo_mapa1(opt, &opt->jogo);
        break;

        case GAMEOVER:
            Gameover_tela(opt);
        break;

        case JOGO_END:
            opt->cor_fundo = (Color){255, 232, 214, 255};
            //Jogo_unload(&opt->jogo);
            opt->tela = GAMEOVER;
        break;

        default:
            menu(opt, &opt->jogo.player);
        break;
    }

}


void UnloadGame(GameOpt *opt){

    UnloadFont(opt->fonte);
    Jogo_unload(&opt->jogo);

}

#endif