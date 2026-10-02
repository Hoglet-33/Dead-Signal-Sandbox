# Dead Signal Sandbox

First-person forest survival: scavenge, craft, build and hide from robot dog patrols.

## Publish on GitHub Pages

1. Create/open your game repository on GitHub.
2. Upload ALL files from this folder into the repository root, including index.wasm.gz and pages-loader.js. Upload the extracted files, not the ZIP.
3. Commit the files to main.
4. Open Settings > Pages. Select Deploy from a branch, main, and /(root), then Save.
5. Once deployment finishes, use the Visit site link shown in Pages settings.

Every file is below 25,000,000 bytes. Keep index.wasm.gz compressed: the custom loader decompresses it in the browser. No server configuration, Git LFS, Godot, or Blender is required. Use a current desktop browser with WebGL 2 and gzip DecompressionStream support.

The files use relative paths, so a project URL such as https://USERNAME.github.io/REPOSITORY/ works.

## Controls

WASD move; mouse look; Shift sprint; Ctrl crouch; Space jump.
E interact; left click attack; 4 axe; 5 bow; 6 rocks; Q throw rock; right click aim.
B build; Z choose piece; R rotate/repair; hold X dismantle; T place snare.
F flashlight; 1 eat; 2 drink; 3 heal; Tab supplies; F5 save; M music; Esc pause.

Browser saves remain on that browser and site address. This is a single-player game.
