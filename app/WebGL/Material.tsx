import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import frag from "./shader/main.frag";
import vert from "./shader/main.vert";

declare global {
   namespace JSX {
      interface IntrinsicElements {
         webGLMaterial: any;
      }
   }
}

export type WebGLMaterialProps = {
   u_time: number;
   u_resolution: THREE.Vector2;
};

export const WebGLMaterial = shaderMaterial(
   {
      u_time: 0,
      u_resolution: new THREE.Vector2(0, 0),
   },
   vert,
   frag
);
