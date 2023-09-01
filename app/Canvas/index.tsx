"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Shader } from "./Shader";

export const ThreeCanvas = () => {
   return (
      <>
         <Canvas dpr={[1, 1.5]}>
            <Suspense fallback={null}>
               <Shader />
            </Suspense>
         </Canvas>
      </>
   );
};
