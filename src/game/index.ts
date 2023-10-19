import { Direction, Facing } from "..";

const directions: Facing[] = ["NORTH", "EAST", "SOUTH", "WEST"];

type GameOptions = {
  grid: {
    x: number;
    y: number;
  };
};

export type Coordinate = {
  x: number;
  y: number;
};

export type GameDrone = {
  coordinate: Coordinate;
  facing: Facing;
  rotation: number;
  attacking?: Coordinate;
};

export default class Game {
  public drone: GameDrone | undefined;
  public options: GameOptions;
  public grid: Coordinate[][];
  constructor(
    options: GameOptions = {
      grid: { x: 10, y: 10 },
    },
  ) {
    this.options = options;
    const { x, y } = this.options.grid;
    this.grid = new Array(x);

    for (let i = 0; i < x; i++) {
      this.grid[i] = new Array(y);
      for (let j = 0; j < y; j++) {
        this.grid[i][j] = { x: i, y: y - j - 1 };
      }
    }
  }

  attack() {
    if (this.drone) {
      const attackVector = this.getAttackVector();
      const newPosition = {
        x: this.drone.coordinate.x + attackVector.x,
        y: this.drone.coordinate.y + attackVector.y,
      };
      if (this.inBounds(newPosition)) {
        console.log(`[ACTION]: ATTACK: ${newPosition.x}, ${newPosition.y}`);
        this.drone.attacking = newPosition;
      }
    }

    return this.drone;
  }

  clearAttack() {
    if (this.drone) {
      this.drone.attacking = undefined;
    }
    return this.drone;
  }
  report() {
    if (this.drone) {
      const { x, y } = this.drone.coordinate;
      const message = `${x}, ${y}, ${this.drone.facing}`;

      console.log(`[ACTION]: REPORT: ${message}`);
      return message;
    } else {
      // if no drone
      console.log("no position, drone has not been added");
    }
  }

  rotate(direction: Direction) {
    if (this.drone !== undefined) {
      // find index of current direction
      const index = directions.findIndex((x) => x === this.drone?.facing);
      // assuming we have a valid direction
      if (index !== -1) {
        const modifier = direction === "LEFT" ? -1 : 1;
        let newDirection =
          (index + modifier + directions.length) % directions.length;
        this.drone.facing = directions[newDirection];
        this.drone.rotation += direction === "LEFT" ? -90 : 90;
        console.log(directions[newDirection]);
        console.log(`[ACTION]: ROTATE: ${direction}`);
      } else {
        console.error("invalid direction passed");
      }
    }
    return this.drone;
  }

  move() {
    // need to check there's a drone
    if (this.drone) {
      // need to get the move vector
      const moveVector = this.getMoveVector();
      const newPosition = {
        x: this.drone.coordinate.x + moveVector.x,
        y: this.drone.coordinate.y + moveVector.y,
      };
      if (this.inBounds(newPosition)) {
        this.drone.coordinate = newPosition;
        console.log(this.drone.coordinate);
      }
    }
    // need to check the vector is in bounds
    // if happy path, update drone position

    console.log("[ACTION]: MOVE");
    return this.drone;
  }

  private inBounds(position: Coordinate): boolean {
    const notInBounds =
      position.x < 0 ||
      position.x > this.options.grid.x - 1 ||
      position.y < 0 ||
      position.y > this.options.grid.y - 1;
    return !notInBounds;
  }

  private getMoveVector() {
    if (!this.drone) {
      throw new Error("cannot get vector when drone is undefined");
    }
    if (this.drone.facing === "EAST") {
      return { x: 1, y: 0 };
    }

    if (this.drone.facing === "WEST") {
      return { x: -1, y: 0 };
    }

    if (this.drone.facing === "NORTH") {
      return { x: 0, y: 1 };
    }

    if (this.drone.facing === "SOUTH") {
      return { x: 0, y: -1 };
    }

    return { x: 0, y: 0 };
  }

  private getAttackVector() {
    if (!this.drone) {
      throw new Error("cannot get vector when drone is undefined");
    }
    if (this.drone.facing === "EAST") {
      return { x: 2, y: 0 };
    }

    if (this.drone.facing === "WEST") {
      return { x: -2, y: 0 };
    }

    if (this.drone.facing === "NORTH") {
      return { x: 0, y: 2 };
    }

    if (this.drone.facing === "SOUTH") {
      return { x: 0, y: -2 };
    }

    return { x: 0, y: 0 };
  }

  private getInitialRotation(facing: Facing) {
    switch (facing) {
      case "NORTH":
        return 0;
      case "EAST":
        return 90;
      case "SOUTH":
        return 180;
      case "WEST":
        return 270;
    }
  }

  place(x: number, y: number, facing: Facing) {
    this.drone = {
      coordinate: { x, y },
      rotation: this.getInitialRotation(facing),
      facing,
    };
    console.log(`[ACTION]: PLACE (${x},${y},${facing})`);
    return this.drone;
  }
}
