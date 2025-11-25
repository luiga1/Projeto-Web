#ifndef JOGO_H
#define JOGO_H

#include "raylib.h"
#include "commun.h"
#include "player.c"
#include "inimigos.c"
#include "structs.h"
#include <stddef.h>

Jogo Jogo_init(GameOpt *opt);

void Jogo_unload(Jogo *jogo_opt);

void Jogo_mapa1(GameOpt *opt, Jogo *jogo_opt);

Jogo Jogo_init(GameOpt *opt){

    Inimigo cabeca;
    cabeca.prox = NULL;

    Inimigo_add(&cabeca);

    // Inicia o player (teste)
    Jogo jogo = {
        Player_init(&opt->jogador),

        cabeca,
        0
    };

    return jogo;
}

void Jogo_unload(Jogo *jogo_opt){
    Player_unload(&jogo_opt->player);

    Inimigo_limpar(jogo_opt->inimigos.prox);
}

void Jogo_mapa1(GameOpt *opt, Jogo *jogo_opt){

    opt->cor_fundo = RAYWHITE;

    Rectangle chao = {
        0,
        VH * 0.8,
        VW,
        VH * 0.2
    };

    Player_pular(&jogo_opt->player, chao);

    DrawRectangleRec(chao, BLACK);

    Player_gravidade(&jogo_opt->player, chao);

    Inimigo_draw(jogo_opt->inimigos.prox);

    Inimigo_mover(jogo_opt->inimigos.prox, jogo_opt->player.velocidade.x);

    Inimigo_removeForaTela(&jogo_opt->inimigos);

    if(Inimigo_colisao(jogo_opt->inimigos.prox, jogo_opt->player)){
        opt->tela = JOGO_END;
    }

    jogo_opt->temp += GetFrameTime();

    if(jogo_opt->temp > 2.5){
        Inimigo_add(&jogo_opt->inimigos);
        jogo_opt->temp = 0;
    }

    //DrawRectangleRec(jogo_opt->player.box, BLUE);

    Player_draw(&jogo_opt->player, 0);
}

#endif