"use client";

import { useDeviceDetector, useStarter } from "@funtech-inc/spice";

export const AppHooks = () => {
   useStarter();
   const { testing } = useDeviceDetector((ua) => {
      return /\b(Line|Instagram)\b/.test(ua);
   });
   return (
      <style jsx global>{`
         :root {
            --stable-svh: ${testing ? `${window.innerHeight / 100}px` : "1svh"};
            --stable-lvh: ${testing
               ? `${window.screen.height / 100}px`
               : "1lvh"};
         }
      `}</style>
   );
};
