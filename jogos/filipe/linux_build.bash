#!/bin/bash

cc codigo/main.c -o frontBros \
    -I/home/filipe/Documentos/Projetos/Jogos_Raylib/raylib_linux/include \
    -L/home/filipe/Documentos/Projetos/Jogos_Raylib/raylib_linux/lib \
    -lraylib -lGL -lm -lpthread -ldl -lrt -lX11
