"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Game, { GameDrone } from "@/game";
import { Direction, Facing } from "..";
import Map from "../components/map";

export default function GameWrapper() {
  const game = useMemo(() => new Game(), []);
  const [drone, setDrone] = useState<GameDrone | undefined>();

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
    <div className="block items-center lg:flex">
      <Map drone={drone} />
      <div className="mx-auto mt-4 lg:mt-0 lg:pl-4">
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

        <form className="block" onSubmit={handleFormSubmit}>
          <div className="inline-flex lg:block">
            <div className="flex-item form-control max-w-xs">
              <label className="label" htmlFor="x">
                <span className=" label-text"> X coordinate</span>
              </label>
              <input
                className="input join-item input-bordered"
                name="x"
                type="number"
                min={0}
                max={9}
              />
            </div>
            <div className="flex-item form-control max-w-xs">
              <label className="label" htmlFor="y">
                <span className=" label-text"> Y coordinate</span>
              </label>
              <input
                className="input join-item input-bordered"
                name="y"
                type="numer"
                min={0}
                max={9}
              />
            </div>
            <div className="flex-item form-control mb-4 max-w-xs">
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
          </div>

          <button
            type="submit"
            className=" flex-item btn btn-primary form-control"
          >
            place
          </button>
        </form>
      </div>
    </div>
  );
}
