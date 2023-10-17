import Game, { Coordinate, GameDrone } from "../game";

test("The Game object exists", () => {
  const game = new Game();
});

test("Game has the place action", () => {
  const game = new Game();
  game.place(0, 0, "NORTH");
});

test("Game has the move action", () => {
  const game = new Game();
  game.move();
});

test("Game has the rotate action", () => {
  const game = new Game();
  game.rotate("LEFT");
  game.rotate("RIGHT");
});

test("Game has the report action", () => {
  const game = new Game();
  game.report();
});

test("Game has the attack action", () => {
  const game = new Game();
  game.attack();
});

test("Game constructor has configuration for grid size", () => {
  const game = new Game({
    grid: { x: 10, y: 10 },
  });
});

test("Calling place adds a drone to the game", () => {
  const game = new Game();
  expect(game.drone).toBeUndefined();
  game.place(0, 0, "NORTH");
  const expected: GameDrone = {
    coordinate: { x: 0, y: 0 },
    facing: "NORTH",
  };
  expect(game.drone).toStrictEqual(expected);
});

test("Calling rotate left with a drone facing NORTH updates the drone to face WEST", () => {
  const game = new Game();
  expect(game.drone).toBeUndefined();
  game.place(0, 0, "NORTH");
  game.rotate("LEFT");
  const expected: GameDrone = {
    coordinate: { x: 0, y: 0 },
    facing: "WEST",
  };
  expect(game.drone).toStrictEqual(expected);
});

test("Calling rotate right with a drone facing NORTH updates the drone to face EAST", () => {
  const game = new Game();
  expect(game.drone).toBeUndefined();
  game.place(0, 0, "NORTH");
  game.rotate("RIGHT");
  const expected: GameDrone = {
    coordinate: { x: 0, y: 0 },
    facing: "EAST",
  };
  expect(game.drone).toStrictEqual(expected);
});

test("Calling move when drone is at 2,2 facing NORTH, should move drone to 2,3 facing NORTH", () => {
  const game = new Game();
  game.place(2, 2, "NORTH");
  game.move();
  const newDrone = game.drone;
  const expected: GameDrone = {
    coordinate: { x: 2, y: 3 },
    facing: "NORTH",
  };

  expect(newDrone).toStrictEqual(expected);
});

test("Calling attack when drone is at 2,2, facing NORTH, should trigger an attack and return the target square", () => {
  const game = new Game();
  game.place(2, 2, "NORTH");
  const drone = game.attack();
  const expected: Coordinate = {
    x: 2,
    y: 4,
  };

  expect(drone?.attacking).toStrictEqual(expected);
});

test("Calling attack when drone is at 0,0, facing SOUTH, should not trigger an attack", () => {
  const game = new Game();
  game.place(0, 0, "SOUTH");
  const drone = game.attack();

  expect(drone?.attacking).toBeUndefined();
});
