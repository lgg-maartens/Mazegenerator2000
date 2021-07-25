var CANVAS_WIDTH = 500, 
CANVAS_HEIGHT = 400,
GRID_HEIGHT = 20,
GRID_WIDTH = 25

class Tile {

   constructor(x, y) {
     this.x = x;
     this.y = y;
   }

   draw(color){
     fill(color)   
     rect((this.x * t_width) + 2,(this.y * t_height) + 2, t_width - 4, t_height - 4)
   }
}

var stack = [];
var visited = [];
var tile;

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  tile = new Tile(1,1);
  stack.push(tile);
  visited.push(tile);
  background(225);
}

/* tile width and height */
var t_width = CANVAS_WIDTH / GRID_WIDTH
var t_height = CANVAS_HEIGHT / GRID_HEIGHT

function draw() {
  
  visited.forEach(tile => tile.draw(0));
  tile.draw("rgba(0,255,0, 1)");    

  if(visited.length == GRID_HEIGHT * GRID_WIDTH){
    console.log("done!");
    return;
  }

  let dir = getRandomDir(tile);

  // hey we're stuck..
  if(!dir){
    console.log("we're stuck ", tile);
    stack.pop();
    tile = stack[stack.length - 1];
    console.log(visited.length)
  }
  else{  
    newTile = new Tile(tile.x + dir.x, tile.y + dir.y); 
    visited.push(newTile);
    stack.push(newTile);
    tile = newTile;  
  }
}

function tileVisited(x,y){
  return visited.some(t=> { return t.x == x && t.y == y; })
}

function getRandomDir(tile){
  possibleDirs = [];
  if(tile.y != 0 && !tileVisited(tile.x, tile.y - 1))
    possibleDirs.push(0);
  if(tile.x < GRID_WIDTH - 1 && !tileVisited(tile.x + 1, tile.y))
    possibleDirs.push(1);
  if(tile.y < GRID_HEIGHT - 1 && !tileVisited(tile.x, tile.y + 1))
    possibleDirs.push(2);
  if(tile.x != 0 && !tileVisited(tile.x - 1, tile.y))
    possibleDirs.push(3);

  if(possibleDirs.length == 0){   
    return null;
  }

  num = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];

  if(num == 0)
    return { x:0, y:-1};
  if(num == 1)
    return { x:1, y:0};
  if(num == 2)
    return { x:0, y:1};
  if(num == 3)
    return { x:-1, y:0};
}
