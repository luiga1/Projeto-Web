#ifndef PLAYER_C
#define PLAYER_C

#include "raylib.h"
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>
#include "commun.h"
#include "structs.h"
#include "csv.c"

Player Player_init(int *jogador);

void Player_unload(Player *player);

void Player_draw(Player *player, int sprite);

int Player_estaChao(Player *player, int posChao);

void Player_gravidade(Player *player, Rectangle chao);

void Player_pular(Player *player, Rectangle chao);


Player Player_init(int *jogador){

    Player player;
    char buffer[1000];

    // Definições gerais
    char arq_csv[] = "img/players/infoJogadores.csv";
    int max_players = contarLinhas(arq_csv) - 1;

    // Corrige jogador
    if(*jogador < 1){
        *jogador = max_players;
    }else if(*jogador > max_players){
        *jogador = 1;
    }

    // Carrega nome
    lerCSV(buffer, arq_csv, *jogador, 0);
    strcpy(player.nome, buffer);

    // Carrega x e y
    lerCSV(buffer, arq_csv, *jogador, 1);
    int x = VW * atof(buffer);

    lerCSV(buffer, arq_csv, *jogador, 2);
    int y = VH * atof(buffer);

    // Carrega escala
    lerCSV(buffer, arq_csv, *jogador, 3);
    float scale = atof(buffer);

    // Carrega qtd de sprites
    lerCSV(buffer, arq_csv, *jogador, 4);
    player.qtdSprites = atoi(buffer);
    
    // Carrega a imagem e aplica a escala
    lerCSV(buffer, arq_csv, *jogador, 5);
    Image sprite = LoadImage(buffer);

    // Mudar o tamanho da imagem
    int largura = sprite.width * scale;
    int altura = sprite.height * scale;

    ImageResize(&sprite, largura, altura);

    player.sprite = LoadTextureFromImage(sprite);
    UnloadImage(sprite);
    
    if(player.qtdSprites > 0)
        player.box = (Rectangle){x, y, largura / player.qtdSprites, altura};

    // Defini a velocidade
    player.velocidade = (Vector2){350,0};

    return player;
}

void Player_unload(Player *player){
    UnloadTexture(player->sprite);

    player->qtdSprites = 0;
}

void Player_draw(Player *player, int sprite){

    // Desenha o sprite selecionado por player
    DrawTextureRec(
        player->sprite,

        (Rectangle){
            player->box.width * sprite, 
            0, 
            player->box.width,
            player->box.height
        },

        (Vector2){
            player->box.x,
            player->box.y
        },

        RAYWHITE
    );

}

int Player_estaChao(Player *player, int posChao){
    return player->box.y + player->box.height > posChao;
}

void Player_gravidade(Player *player, Rectangle chao){

    player->box.y += player->velocidade.y * GetFrameTime();

    // Aplica a gravidade caso o player não esteja no chão
    if(Player_estaChao(player, chao.y)){

        player->velocidade.y = 0;

        // Evita que o player fique preso no chão
        player->box.y = chao.y - player->box.height;

    }else{
        player->velocidade.y += 15;
    }

}

void Player_pular(Player *player, Rectangle chao){

    if(Player_estaChao(player, chao.y - 1) && (IsKeyPressed(KEY_SPACE) || IsKeyPressed(KEY_UP))){
        player->velocidade.y = -750;
    }

}

#endif