"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Game, { GameDrone } from "@/game";
import { Direction } from "..";

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

  const handlePlace = useCallback(() => {
    const drone = game.place(0, 0, "NORTH");
    if (drone) {
      setDrone(() => ({ ...drone }));
    }
  }, [game]);

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

        <button onClick={handlePlace} className="btn btn-primary">
          place
        </button>
      </div>
    </div>
  );
}
