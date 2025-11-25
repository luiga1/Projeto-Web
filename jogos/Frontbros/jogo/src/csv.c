#ifndef CSV_C
#define CSV_C

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void lerCSV(char *saida, char *caminho,int linha, int coluna);

int contarLinhas(char *caminho);

void lerCSV(char *saida, char *caminho,int linha, int coluna){

    // Abre o arquivo
    FILE *arq = fopen(caminho, "r");

    if(!arq){
        return;
    }

    // Lê a linha desejada
    char row[1000];
    for(int i = 0; i <= linha; i++){
        if(!fgets(row, 1000, arq)){
            return;
        }
    }

    //printf("Row: %s\n", row);

    // Vai até a coluna desejada
    int len = strlen(row);
    int pos = 0, virgulas = 0;
    for(pos = 0; pos < len && virgulas < coluna; pos++){
        if(row[pos] == ','){
            virgulas++;
        }
    }

    // Copia a coluna para a string de saida
    int i = 0;
    while(row[pos] != ',' &&  row[pos] != '\n'){
        saida[i++] = row[pos++];
    }

    saida[i] = '\0';

    //printf("%s\n", saida);

    fclose(arq);
}

int contarLinhas(char *caminho){

    FILE *arq = fopen(caminho, "r");

    if(!arq){
        return -1;
    }

    char buffer[1000]; int count = 0;
    
    while(fgets(buffer, 1000, arq)){
        count++;
    }  

    fclose(arq);

    return count;
}

#endif