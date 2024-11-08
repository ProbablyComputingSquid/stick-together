# stick-together
programming club game jam<br>
stick together is a cooperative multiplayer platformer. the only enemy is yourself :D 

## NEW: LIVE DEPLOYMENT [HERE](https://probablycomputingsquid.github.io/stick-together/stick-together/)!!

<hr>

## controls:

- arrow keys for player 1
- wasd for player 2

# how to build and run locally
## Option one: dev preview with vite

### requires: 
- nodejs
- npm
- a friend to play with

### steps:

## using esbuild for static deployment

### requires: 
- nodejs
- npm
- a friend to play with

#### building the project

```bash
cd stick-together
npm install
npm run build
```
#### viewing project 

##### dev preview
```bash
npm run dev
``` 
or, if you want live updates:

```bash
npm install -g esbuild
esbuild main.ts > build.js --bundle --watch
```
and visit index.html (`npm run dev` works too but it's a waste of compute resources)
