"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Game, { GameDrone } from "@/game";
import { Direction, Facing } from "..";
import Map from "../components/map";

export default function GameWrapper() {
  const [message, setMessage] = useState<string | undefined>();
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
    const message = game.report();
    setMessage(message);
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
      <div className="mx-auto mt-4 block lg:mt-0 lg:pl-4">
        <button
          disabled={!drone}
          onClick={handleReport}
          className="btn btn-primary  btn-sm"
        >
          report
        </button>
        <button
          disabled={!drone}
          onClick={handleMove}
          className="btn btn-primary  btn-sm"
        >
          move
        </button>
        <button
          disabled={!drone}
          onClick={handleRotate("LEFT")}
          className="btn btn-primary  btn-sm"
        >
          left
        </button>
        <button
          disabled={!drone}
          onClick={handleRotate("RIGHT")}
          className="btn btn-primary  btn-sm"
        >
          right
        </button>

        <button
          disabled={!drone}
          onClick={handleAttack}
          className="btn btn-primary btn-sm"
        >
          attack
        </button>
        <div className="mt-4">
          {message && <p className="text-error">REPORTING: {message}</p>}
        </div>
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
              required
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
              required
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
          <button
            type="submit"
            className=" flex-item btn btn-primary form-control"
          >
            place
          </button>
        </form>
        <p className="text mt-4">
          To place the drone on the map, set an X and Y co-ordinate, along with
          a facing value and hit PLACE
        </p>
      </div>
    </div>
  );
}
