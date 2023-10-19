"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Game, { GameDrone } from "@/game";
import { Direction, Facing } from "..";

export default function GameWrapper() {
  const game = useMemo(() => new Game(), []);
  const [drone, setDrone] = useState<GameDrone | undefined>();

  const grid = useMemo(() => {
    const droneLoc = drone?.coordinate;
    return (
      <>
        {game.grid.map((row, rowIndex) => (
          <div key={rowIndex} className="inline-block">
            {row.map((col) => (
              <div
                className={`col-span-1 row-span-1 border p-4 ${
                  droneLoc?.x === col.x && droneLoc?.y === col.y
                    ? "bg-secondary"
                    : ""
                } ${
                  drone?.attacking?.x === col.x && drone?.attacking.y === col.y
                    ? "bg-primary"
                    : ""
                }`}
                key={`${col.x}-${col.y}`}
              >
                x:{col.x} | y:{col.y}
              </div>
            ))}
          </div>
        ))}
        {drone && (
          <div>
            <span>
              drone at: {drone.coordinate.x}, {drone.coordinate.y}, facing:{" "}
              {drone.facing}
            </span>
            {drone.attacking && (
              <span>
                drone attacking: {drone.attacking.x}, {drone.attacking.y}
              </span>
            )}
          </div>
        )}
      </>
    );
  }, [game.grid, drone]);

  const handleRotate = useCallback(
    (direction: Direction) => () => {
      const drone = game.rotate(direction);
      if (drone) {
        setDrone(() => ({ ...drone }));
      }
    },
    [game],
  );

  const handleMove = useCallback(() => {
    const drone = game.move();
    if (drone) {
      setDrone(() => ({ ...drone }));
    }
  }, [game]);

  const handleAttack = useCallback(() => {
    const drone = game.attack();
    if (drone) {
      setDrone(() => ({ ...drone }));
    }
  }, [game]);

  const handleReport = useCallback(() => {
    game.report();
  }, [game]);

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const x = data.get("x")?.valueOf();
      const y = data.get("y")?.valueOf();
      const facing = data.get("facing")?.valueOf();
      const drone = game.place(
        parseInt(`${x}`),
        parseInt(`${y}`),
        facing?.toString() as Facing,
      );

      if (drone) {
        setDrone(() => ({ ...drone }));
      }
    },
    [game],
  );

  useEffect(() => {
    if (drone?.attacking) {
      const timer = setTimeout(() => {
        const updatedDrone = game.clearAttack();
        if (updatedDrone) {
          setDrone(() => ({ ...updatedDrone }));
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [drone, game]);

  return (
    <div>
      <div className="mb-4">{grid}</div>
      <div>
        <button
          disabled={!drone}
          onClick={handleReport}
          className="btn btn-primary"
        >
          report
        </button>
        <button
          disabled={!drone}
          onClick={handleMove}
          className="btn btn-primary"
        >
          move
        </button>
        <button
          disabled={!drone}
          onClick={handleRotate("LEFT")}
          className="btn btn-primary"
        >
          left
        </button>
        <button
          disabled={!drone}
          onClick={handleRotate("RIGHT")}
          className="btn btn-primary"
        >
          right
        </button>

        <button
          disabled={!drone}
          onClick={handleAttack}
          className="btn btn-primary"
        >
          attack
        </button>

        <form onSubmit={handleFormSubmit}>
          <div className="form-control mt-4 max-w-xs">
            <label className="label" htmlFor="x">
              <span className=" label-text"> X coordinate</span>
            </label>
            <input
              className="input join-item input-bordered"
              name="x"
              type="number"
              min={0}
              max={9}
              defaultValue={0}
            />
          </div>
          <div className="form-control max-w-xs">
            <label className="label" htmlFor="y">
              <span className=" label-text"> Y coordinate</span>
            </label>
            <input
              className="input join-item input-bordered"
              name="y"
              type="numer"
              min={0}
              max={9}
              defaultValue={0}
            />
          </div>
          <div className="form-control mb-4 max-w-xs">
            <label className="label" htmlFor="facing">
              <span className=" label-text">Facing</span>
            </label>
            <select
              className="select join-item select-bordered"
              name="facing"
              defaultValue={"NORTH"}
            >
              <option value="NORTH">North</option>
              <option value="EAST">East</option>
              <option value="SOUTH">South</option>
              <option value="WEST">West</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            place
          </button>
        </form>
      </div>
    </div>
  );
}
