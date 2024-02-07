"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Playground } from "./Playground";
import { PerformanceMonitor, StatsGl } from "@react-three/drei";

export const WebGLCanvas = () => {
   const [dpr, setDpr] = useState(1.5);

   return (
      <Canvas dpr={dpr}>
         <PerformanceMonitor
            factor={1}
            onChange={({ factor }) => {
               console.log(`dpr:${dpr}`);
               setDpr(Math.round((0.5 + 1.0 * factor) * 10) / 10);
            }}>
            <Suspense fallback={null}>
               <Playground />
            </Suspense>
            <StatsGl />
         </PerformanceMonitor>
      </Canvas>
   );
};
