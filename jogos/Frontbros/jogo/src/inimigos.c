#ifndef INIMIGOS_C
#define INIMIGOS_C

#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <stdbool.h>
#include "raylib.h"
#include "commun.h"
#include "structs.h"

Inimigo Inimigo_criarAleatorio();

void Inimigo_add(Inimigo *lista);

void Inimigo_limpar(Inimigo *lista);

void Inimigo_removeForaTela(Inimigo *lista);

void Inimigo_draw(Inimigo *lista);

void Inimigo_mover(Inimigo *lista, int velocidade);

Inimigo Inimigo_criarAleatorio(){

    Inimigo inimigo;
    char buffer[1000];
    srand(time(NULL));

    char arq_csv[] = "img/inimigos/infoInimigos.csv";
    int max_inimigos = contarLinhas(arq_csv) - 1;

    // Seleciona o inimigo
    int qual_inimigo = (rand() % max_inimigos) + 1;

    // Lê o nome
    lerCSV(buffer, arq_csv, qual_inimigo, 0);
    strcpy(inimigo.nome, buffer);

    // Lê a escala
    lerCSV(buffer, arq_csv, qual_inimigo, 1);
    float scale = atof(buffer);

    // Carrega a imagem
    lerCSV(buffer, arq_csv, qual_inimigo, 2);
    Image sprite = LoadImage(buffer);

    int largura = sprite.width * scale;
    int altura = sprite.height * scale;

    ImageResize(&sprite, largura, altura);

    inimigo.sprite = LoadTextureFromImage(sprite);
    UnloadImage(sprite);

    // Carrega a hit box
    inimigo.box = (Rectangle){VW, VH * 0.8 - altura, largura, altura};

    inimigo.prox = NULL;

    return inimigo;
}

void Inimigo_add(Inimigo *lista){

    Inimigo *novo = malloc(sizeof(Inimigo));

    if(!novo){
        return;
    }

    *novo = Inimigo_criarAleatorio();

    novo->prox = lista->prox;

    lista->prox = novo;
}

void Inimigo_limpar(Inimigo *lista){

    if(lista){
        Inimigo_limpar(lista->prox);
        UnloadTexture(lista->sprite);
        free(lista);
        lista = NULL;
    }
}

void Inimigo_removeForaTela(Inimigo *lista){

    Inimigo *atual = lista->prox;

    if(!atual){
        return;
    }

    if(atual->box.x < 0 - atual->box.width){

        lista->prox = atual->prox;
        UnloadTexture(atual->sprite);
        free(atual);
    }

    Inimigo_removeForaTela(atual);
}

void Inimigo_draw(Inimigo *lista){

    if(lista){

        DrawTextureRec(
            lista->sprite,

            (Rectangle){
                0, 
                0, 
                lista->box.width,
                lista->box.height
            },

            (Vector2){
                lista->box.x,
                lista->box.y
            },

            RAYWHITE
        );

        Inimigo_draw(lista->prox);
    }
}

void Inimigo_mover(Inimigo *lista, int velocidade){

    if(lista){
        Inimigo_mover(lista->prox, velocidade);

        lista->box.x -= velocidade * GetFrameTime();
    }
}

bool Inimigo_colisao(Inimigo *lista, Player player){

    if(lista){
        if(CheckCollisionRecs(lista->box, player.box)){
            return true;
        }

        return Inimigo_colisao(lista->prox, player);
    }

    return false;
}

#endif