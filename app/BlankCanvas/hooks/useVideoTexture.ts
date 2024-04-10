import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { suspend } from "suspend-react";
import { create } from "zustand";

interface VideoTextureProps extends HTMLVideoElement {
   unsuspend?: "canplay" | "canplaythrough" | "loadstart" | "loadedmetadata";
   start?: boolean;
}

type VideoLoadStore = {
   id: number[];
   count: number;
   setCount: (videoLoadCount: number) => void;
};

// Global store to monitor video loading status
export const useVideoLoadCount = create<VideoLoadStore>((set) => ({
   id: [],
   count: 0,
   setCount: (value: number) =>
      set((state) => {
         const newArr = [...state.id, value];
         return {
            id: newArr,
            count: newArr.length,
         };
      }),
}));

/**
 * This is an extension to drei/useVideoTexture. It adds `useVideoLoadCount`, which allows monitoring video load status globally, and `isLowPowerMode` to set fallback for iOS low power mode.
 */
export function useVideoTexture(
   src: string | MediaStream,
   props?: Partial<VideoTextureProps>
) {
   const { unsuspend, start, crossOrigin, muted, loop, ...rest } = {
      unsuspend: "loadedmetadata",
      crossOrigin: "Anonymous",
      muted: true,
      loop: true,
      start: true,
      playsInline: true,
      ...props,
   };
   const gl = useThree((state) => state.gl);

   const setVideoLoadCount = useVideoLoadCount((s) => s.setCount);

   const isLowPowerMode = useRef<boolean>(false);

   const texture = suspend(
      () =>
         new Promise((res) => {
            const video = Object.assign(document.createElement("video"), {
               src: (typeof src === "string" && src) || undefined,
               srcObject: (src instanceof MediaStream && src) || undefined,
               crossOrigin,
               loop,
               muted,
               ...rest,
            });
            const texture = new THREE.VideoTexture(video);
            texture.colorSpace = gl.outputColorSpace;
            video.addEventListener(unsuspend, () => {
               setVideoLoadCount(texture.id);
               res(texture);
            });
         }),
      [src]
   ) as THREE.VideoTexture;

   useEffect(() => {
      if (start) {
         texture.image
            .play()
            .then(() => {
               isLowPowerMode.current = false;
            })
            .catch(() => {
               isLowPowerMode.current = true;
            });
         return () => texture.image.pause();
      }
   }, [texture, start]);

   return { texture, isLowPowerMode };
}
