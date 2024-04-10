"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Playground } from "./Playground";
import { PerformanceMonitor, StatsGl } from "@react-three/drei";
import { use100vh } from "@funtech-inc/spice";

const BlankCanvas = ({
   eventSource,
}: {
   eventSource: HTMLElement | React.MutableRefObject<HTMLElement> | undefined;
}) => {
   const [dpr, setDpr] = useState(1);
   return (
      <Canvas dpr={dpr} eventSource={eventSource} eventPrefix="client">
         <PerformanceMonitor
            factor={1}
            onChange={({ factor }) => {
               console.log(`dpr:${dpr}`);
               setDpr(Math.round((0.5 + 1.0 * factor) * 10) / 10);
            }}>
            <Suspense fallback={null}>
               <Playground />
            </Suspense>
            <StatsGl horizontal={false} />
         </PerformanceMonitor>
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
            width: "100%",
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
      <>
         <FullHeightContainer style={{ zIndex: -100000000 }}>
            <BlankCanvas eventSource={ref} />
         </FullHeightContainer>
         <div ref={ref}>
            {/* If children is less than 100svh, the target cannot be obtained, so add a div for obtaining the target. */}
            <FullHeightContainer style={{ zIndex: 0 }} />
            <div
               style={{
                  pointerEvents: "none",
                  position: "relative",
                  zIndex: 0,
               }}>
               {children}
            </div>
         </div>
      </>
   );
};

export default CanvasWrapper;
