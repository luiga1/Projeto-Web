// main.c (trecho completo adaptado)
// #ifdef __EMSCRIPTEN__
#ifdef E
    #include <emscripten/emscripten.h>
    #include <emscripten/html5.h> // necessário para EmscriptenUiEvent, emscripten_get_element_css_size, etc.
#endif

#include <math.h>
#include <stdio.h>
#include "raylib.h"
#include "game.c"
#include "commun.h"

GameOpt opcoes;

static RenderTexture2D target;

// Fallback compat (caso sua versão do emscripten só tenha emscripten_set_canvas_size)
#ifdef E
    #ifndef emscripten_set_canvas_element_size
        // define uma "macro" que chama a API antiga se a nova não existir
        #define emscripten_set_canvas_element_size(selector, w, h) emscripten_set_canvas_size((w),(h))
    #endif
#endif

// função que desenha um frame (usada tanto no desktop quanto no web)
void desenharFrame(void)
{
#ifdef E
    if (/*WindowShouldClose()*/0)
    {
        // cancela o main loop do emscripten para poder fazer cleanup
        emscripten_cancel_main_loop();
        // cleanup
        UnloadRenderTexture(target);
        UnloadGame(&opcoes);
        CloseWindow();
        return;
    }
#else
    if (WindowShouldClose()) return;
#endif

    float screenW = (float)GetScreenWidth();
    float screenH = (float)GetScreenHeight();

    float scale = fminf(screenW / (float)VW, screenH / (float)VH);

    int scaledW = (int)(VW * scale);
    int scaledH = (int)(VH * scale);
    int offsetX = (int)((screenW - scaledW) / 2.0f);
    int offsetY = (int)((screenH - scaledH) / 2.0f);

    //---------------------------------------------------------------------
    BeginTextureMode(target);
        
    drawGame(&opcoes);    

    EndTextureMode();
    //---------------------------------------------------------------------

    BeginDrawing();
    ClearBackground(BLACK);

    DrawTexturePro(
        target.texture,
        (Rectangle){ 0.0f, 0.0f, (float)target.texture.width, -(float)target.texture.height },
        (Rectangle){ (float)offsetX, (float)offsetY, (float)scaledW, (float)scaledH },
        (Vector2){ 0.0f, 0.0f },
        0.0f,
        WHITE
    );

    EndDrawing();
}

// Callback para resize do navegador
#ifdef E
EM_BOOL browser_resize_callback(int eventType, const EmscriptenUiEvent *uiEvent, void *userData) {
    double cssW = 0.0, cssH = 0.0;

    // pega o tamanho CSS do elemento canvas (id "#canvas" - padrão do shell do emscripten)
    // emscripten_get_element_css_size() está em emscripten/html5.h
    emscripten_get_element_css_size("#canvas", &cssW, &cssH);

    // compensar devicePixelRatio para HiDPI
    double dpr = emscripten_get_device_pixel_ratio();
    int newWidth  = (int) (cssW * dpr);
    int newHeight = (int) (cssH * dpr);

    // redimensiona o elemento canvas (framebuffer)
    emscripten_set_canvas_element_size("#canvas", newWidth, newHeight);

    // avisa o Raylib (pode ser necessário ajustar rlViewport/rlgl em casos raros)
    SetWindowSize(newWidth, newHeight);

    TraceLog(LOG_INFO, "Canvas resized: %d x %d (CSS: %.0fx%.0f, DPR=%.2f)", newWidth, newHeight, cssW, cssH, dpr);

    return EM_TRUE; // evento tratado
}
#endif

int main(void)
{
    const int winW = 1280;
    const int winH = 720;

    SetConfigFlags(FLAG_WINDOW_RESIZABLE);
    InitWindow(winW, winH, "FrontEnd Bros.");
    SetTargetFPS(60);

#ifdef E
    emscripten_set_resize_callback(EMSCRIPTEN_EVENT_TARGET_WINDOW, NULL, EM_TRUE, browser_resize_callback);
    // ajusta para o tamanho atual do canvas
    browser_resize_callback(0, NULL, NULL);
#endif

    target = LoadRenderTexture(VW, VH);
    SetTextureFilter(target.texture, TEXTURE_FILTER_BILINEAR);

    opcoes = initGame();

#ifdef E
    emscripten_set_main_loop(desenharFrame, 0, 1);
#else
    while (!WindowShouldClose())
    {
        desenharFrame();
    }

    UnloadGame(&opcoes);
    UnloadRenderTexture(target);
    CloseWindow();
#endif

    return 0;
}

