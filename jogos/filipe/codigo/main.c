#include "raylib.h"

#define SW 1280
#define SH 720

int main(void) {
    
    InitWindow(SW, SH, "FrontEnd Bros.");
    SetTargetFPS(60);

    while (!WindowShouldClose()) {
        BeginDrawing();
        ClearBackground(RAYWHITE);

        
        EndDrawing();
    }

    CloseWindow();
    return 0;
}
