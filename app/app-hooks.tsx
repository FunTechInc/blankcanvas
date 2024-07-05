"use client";

import { useDeviceDetector, useStarter } from "@funtech-inc/spice";

export const AppHooks = () => {
   useStarter();
   const { isMobile } = useDeviceDetector();
   return (
      <style jsx global>{`
         :root {
            --fixed-svh: ${isMobile ? `${window.innerHeight / 100}px` : "1svh"};
            --fixed-lvh: ${isMobile
               ? `${window.screen.height / 100}px`
               : "1lvh"};
         }
      `}</style>
   );
};
