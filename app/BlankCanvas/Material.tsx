import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import frag from "./shader/main.frag";
import vert from "./shader/main.vert";

declare global {
   namespace JSX {
      interface IntrinsicElements {
         blankMaterial: any;
      }
   }
}

export type BlankMaterialProps = {
   u_time: number;
   u_resolution: THREE.Vector2;
   u_tex: THREE.Texture;
};

export const BlankMaterial = shaderMaterial(
   {
      u_time: 0,
      u_resolution: new THREE.Vector2(0, 0),
      u_tex: new THREE.Texture(),
   },
   vert,
   frag
);
