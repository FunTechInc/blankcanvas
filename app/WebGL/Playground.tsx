"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
// import GUI from "lil-gui";
// import { useGUI } from "@/utils/useGUI";
import { WebGLMaterial, WebGLMaterialProps } from "./Material";

extend({ WebGLMaterial });

export const Playground = () => {
   const ref = useRef<WebGLMaterialProps>();

   useFrame((props) => {
      ref.current!.u_time = props.clock.getElapsedTime();
   });

   /*===============================================
	set Resolution
	===============================================*/
   const { size } = useThree();
   useEffect(() => {
      ref.current!.u_resolution = new THREE.Vector2(size.width, size.height);
   }, [size]);

   return (
      <mesh>
         <planeGeometry args={[2, 2]} />
         <webGLMaterial key={WebGLMaterial} ref={ref} />
      </mesh>
   );
};
