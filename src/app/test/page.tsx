"use client";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import drone from "../../assets/drone.svg";
import Image from "next/image";

export default function TestPage() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);
  const { droneX, droneY } = useMemo(() => {
    if (containerRef.current && droneRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      return {
        droneX: (clientWidth / 100) * x * 10,
        droneY:
          clientHeight -
          (clientHeight / 100) * y * 10 -
          droneRef.current.clientHeight,
      };
    }
    return { droneX: 0, droneY: 0 };
  }, [x, y, containerRef, droneRef]);
  return (
    <div className="grid h-[80vh] w-full">
      <div
        ref={containerRef}
        className="aspect-square w-full justify-self-center bg-slate-50 bg-[url('/background.svg')] bg-cover"
      >
        <motion.div
          ref={droneRef}
          style={{
            width: "10%",
            height: "10%",
            backgroundColor: "red",
          }}
          animate={{
            x: droneX,
            y: droneY,
            rotate,
          }}
        >
          <Image priority src={drone} alt="drone" />
        </motion.div>
      </div>
    </div>
  );
}
