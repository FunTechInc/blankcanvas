"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import GUI from "lil-gui";
import { useGUI } from "./hooks/useGUI";
import { BlankMaterialProps, BlankMaterial } from "./Material";
import { useBrush } from "@funtech-inc/use-shader-fx";

extend({ BlankMaterial });

const CONFIG = {
   color: new THREE.Color("red"),
};
const setGUI = (gui: GUI) => {
   gui.addColor(CONFIG, "color");
};

export const Playground = () => {
   const updateGUI = useGUI(setGUI);
   const ref = useRef<BlankMaterialProps>();
   const { size, viewport } = useThree();

   const [updateBrush, setBrush, { output }] = useBrush({
      size,
      dpr: viewport.dpr,
   });

   setBrush({
      radius: 0.01,
   });

   useFrame((props) => {
      updateBrush(props, {
         color: CONFIG.color,
      });
      ref.current!.u_time = props.clock.getElapsedTime();
      updateGUI();
   });

   // set resolution
   useEffect(() => {
      ref.current!.u_resolution = new THREE.Vector2(size.width, size.height);
   }, [size]);

   return (
      <mesh>
         <planeGeometry args={[2, 2]} />
         <blankMaterial key={BlankMaterial.key} u_tex={output} ref={ref} />
      </mesh>
   );
};
