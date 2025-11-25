#ifndef BTN_C
#define BTN_C

#include "raylib.h"
#include <math.h>
#include <string.h>
#include <stdbool.h>
#include "ui_utils.c"

typedef struct Btn{

    char texto[200];
    Rectangle pos;
    float margin;
    Color corExterno;
    Color corInterno;
    Color corTexto;
    Font fonte;
    bool seno;

}Btn;

void Btn_desenhar(Btn *this);

bool Btn_clicado(Btn *this);

void Btn_desenhar(Btn *this){

    // Função original:
    // BtnSeno(Rectangle retangulo, float margin, char *texto, Color externo, Color interno, Color texto_cor, Font fonte)

    Rectangle retangulo = this->pos;
    float margin = this->margin;
    Color externo = this->corExterno;
    Color interno = this->corInterno;
    Color texto_cor = this->corTexto;
    Font fonte = this->fonte;

    char texto[200];
    strcpy(texto, this->texto);

    float diferenca;
    bool clicado = false;
    Vector2 mouse = GetMousePosition();

    // Verifica se o mouse está acima do botão
    if(CheckCollisionPointRec(mouse, retangulo)){

        if(this->seno){
            diferenca = retangulo.height * sin(GetTime() * 2) * 0.1;

            retangulo.x -= diferenca / 2;
            retangulo.y -= diferenca / 2;
            retangulo.height += diferenca;
            retangulo.width += diferenca;
        }

        // Verifica se o mouse clicou no notão
        if(IsMouseButtonPressed(MOUSE_BUTTON_LEFT)){
            clicado = true;
        }

    }

    // Desenha o botão
    DrawRectangleRec(retangulo, externo);

    diferenca = retangulo.height * margin;

    retangulo.x += diferenca / 2;
    retangulo.y += diferenca / 2;
    retangulo.height -= diferenca;
    retangulo.width -= diferenca;

    DrawRectangleRec(retangulo, interno);

    diferenca = retangulo.height * margin;

    retangulo.x += diferenca / 2;
    retangulo.y += diferenca ;
    retangulo.height -= diferenca;
    retangulo.width -= diferenca;

    // Vefica se o texto não vai ficar maior que o botão
    Vector2 largura = MeasureTextEx(fonte, texto, retangulo.height, 2);
    while(largura.x > retangulo.width){
        retangulo.height--;
        retangulo.y += 0.5;
        largura = MeasureTextEx(fonte, texto, retangulo.height, 2);
    }

    // Desenha o texto
    DrawTextEx(
        fonte, texto, 
        (Vector2){CentroXTexto(texto, retangulo.x + retangulo.width / 2, retangulo.height, fonte),retangulo.y}, 
        retangulo.height, 2, texto_cor);
}

bool Btn_clicado(Btn *this){

    if(CheckCollisionPointRec(GetMousePosition(), this->pos)){

        // Verifica se o mouse clicou no notão
        if(IsMouseButtonPressed(MOUSE_BUTTON_LEFT)){
            return true;
        }
    }

    return false;
}

#endif