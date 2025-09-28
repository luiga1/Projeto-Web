#! /bin/bash

source /home/filipe/Documentos/Programas/emsdk/emsdk_env.sh

echo "Emsdk pronto!"

emcc codigo/main.c \
    raylib/lib/libraylib.a \
    -o frontBros.html \
    -Os -Wall \
    -Iraylib/include \
    -s USE_GLFW=3 \
    -DPLATFORM_WEB \
    #-s ASYNCIFY 

echo "Compilação pronta!"

google-chrome "http://localhost:8080"

python3 -m http.server 8080
