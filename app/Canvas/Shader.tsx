import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "./shader/main.vert";
import fragmentSahder from "./shader/main.frag";

export const Shader = () => {
   const ref = useRef<any>();

   //call frame
   useFrame(({ clock, pointer }) => {
      const tick = clock.getElapsedTime();
      const uniforms = ref.current?.uniforms;
      if (uniforms) {
         // update tick
         uniforms.u_time.value = tick;
      }
   });

   return (
      <mesh>
         <planeGeometry args={[2, 2]} />
         <rawShaderMaterial
            ref={ref}
            uniforms={{
               u_resolution: {
                  value: new THREE.Vector2(
                     window.innerWidth,
                     window.innerHeight
                  ),
               },
               u_time: { value: 0 },
            }}
            vertexShader={vertexShader}
            fragmentShader={fragmentSahder}
         />
      </mesh>
   );
};
