const f = maze => {
  const path = [];
  if(!maze || !maze.length || !maze[0].length)
    return path;

  if(_g(maze, maze.length - 1,
        maze[0].length - 1, path))
    return path;

  return [];
};

const _g = function g(maze, r, c, path) {
  if(r < 0 || c < 0 || !maze[r][c])
    return false;
  if((!r && !c) || g(maze, r-1, c  , path)
                || g(maze, r  , c-1, path)) {
    path.push([r, c]);
    return true;
  }
  return false;
};

const log = console.log,
  eq = require('assert').deepStrictEqual;

eq(f(null), []);
eq(f([[false]]), []);
eq(f([[true]]), [[0, 0]]);
