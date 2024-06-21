"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Playground } from "./Playground";
import { PerformanceMonitor } from "@react-three/drei";
import { use100vh } from "@funtech-inc/spice";
import { Perf } from "r3f-perf";

const BlankCanvas = ({
   eventSource,
}: {
   eventSource: HTMLElement | React.MutableRefObject<HTMLElement> | undefined;
}) => {
   // starts at the 1.5 and clamps the gradual dpr between 0.5 at the lowest and 2 at the highest
   // const [dpr, setDpr] = useState(1.5);
   return (
      <Canvas dpr={[1, 2]} eventSource={eventSource} eventPrefix="client">
         <PerformanceMonitor
         // onChange={({ factor }) => {
         //    console.log(`dpr:${dpr}`);
         //    setDpr(Math.round((0.5 + 1.5 * factor) * 10) / 10);
         // }}
         >
            <Suspense fallback={null}>
               <Playground />
            </Suspense>
         </PerformanceMonitor>
         <Perf position={"bottom-left"} />
      </Canvas>
   );
};

const FullHeightContainer = ({
   children,
   style,
}: {
   children?: React.ReactNode;
   style?: React.CSSProperties;
}) => {
   const ref = useRef<HTMLDivElement>(null);
   // For some mobile browsers, if the CSS is 100vh or 100lvh, the navigation bar may not be included, so by using window.screen.height, it will be displayed to fill the screen.
   use100vh(ref);
   return (
      <div
         ref={ref}
         style={{
            width: "100vw",
            height: "100lvh",
            position: "fixed",
            top: 0,
            left: 0,
            ...(style || {}),
         }}>
         {children ? children : null}
      </div>
   );
};

const CanvasWrapper = ({ children }: { children: React.ReactNode }) => {
   const ref =
      useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
   return (
      <div ref={ref}>
         {/* If children is less than 100svh, the target cannot be obtained, so add a div for obtaining the target. */}
         <FullHeightContainer />
         <div
            style={{
               pointerEvents: "none",
               position: "relative",
            }}>
            <FullHeightContainer style={{ zIndex: -100000000 }}>
               <BlankCanvas eventSource={ref} />
            </FullHeightContainer>
            {children}
         </div>
      </div>
   );
};

export default CanvasWrapper;
