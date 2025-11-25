#ifndef STRUCTS_H
#define STRUCTS_H

#include "raylib.h"

typedef struct Inimigo{

    char nome[50];
    Rectangle box;
    Texture2D sprite;

    struct Inimigo *prox;

}Inimigo;

typedef struct{

    char nome[50];
    Rectangle box;
    Texture2D sprite;
    int qtdSprites;

    Vector2 velocidade;

}Player;

typedef struct{

    // TODO: obj player
    Player player;
    Inimigo inimigos;
    float temp;

}Jogo;

typedef struct{
    
    int tela;
    int jogador;
    Font fonte;
    Color cor_fundo;
    float ignore_input_until;
    Jogo jogo;

}GameOpt;

#endif