"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import droneIcon from "../assets/drone.svg";
import Image from "next/image";
import { GameDrone } from "@/game";
import { Facing } from "..";

type MapProps = {
  drone?: GameDrone;
};

const getRotate = (facing: Facing) => {
  switch (facing) {
    case "NORTH": {
      return 0;
    }
    case "EAST": {
      return 90;
    }
    case "SOUTH": {
      return 180;
    }
    case "WEST": {
      return 270;
    }
    default: {
      return 0;
    }
  }
};

export default function Map({ drone }: MapProps) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [rotate, setRotate] = useState(0);
  const [displayDrone, setDisplayDrone] = useState(false);
  const [displayAttack, setDisplayAttack] = useState(false);
  useEffect(() => {
    if (drone) {
      setX(drone.coordinate.x);
      setY(drone.coordinate.y);
      setRotate((rotate) => getRotate(drone.facing));
      if (drone.attacking) {
        setDisplayAttack(true);
      } else {
        setDisplayAttack(false);
      }
      setDisplayDrone(true);
    } else {
      setDisplayDrone(false);
    }
  }, [drone, drone?.attacking]);
  const containerRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);
  const droneLocation = useMemo(() => {
    if (containerRef.current && droneRef.current && displayDrone) {
      const { clientWidth, clientHeight } = containerRef.current;
      return {
        droneX: (clientWidth / 100) * x * 10,
        droneY:
          clientHeight -
          (clientHeight / 100) * y * 10 -
          droneRef.current.clientHeight,
        droneSize: droneRef.current.clientHeight,
      };
    }
  }, [displayDrone, x, y]);
  return (
    <div className="block h-[80vh] w-full">
      <div
        ref={containerRef}
        className="aspect-square w-full justify-self-center bg-slate-50 bg-[url('/background.svg')] bg-cover"
      >
        <motion.div
          className="shadow-2xl"
          ref={droneRef}
          style={{
            width: "10%",
            height: "10%",
            scale: displayDrone ? 1 : 0,
          }}
          initial={false}
          animate={{
            x: droneLocation?.droneX,
            y: droneLocation?.droneY,
            rotate,
          }}
        >
          <Image priority src={droneIcon} alt="drone" />
          {displayAttack && (
            <motion.div
              animate={{
                y:
                  displayAttack && droneLocation?.droneSize
                    ? [-droneLocation?.droneSize, droneLocation?.droneSize * -3]
                    : droneLocation?.droneSize,
                scale: displayAttack ? [0, 1] : 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeIn",
              }}
              style={{
                borderRadius: "50%",
                backgroundColor: "red",
                width: "100%",
                height: "100%",
                scale: displayAttack ? 1 : 0,
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
