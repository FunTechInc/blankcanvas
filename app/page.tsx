"use client";

import Canvas from "./BlankCanvas";

export default function Home() {
   return (
      <Canvas>
         <main
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               width: "100%",
            }}>
            <button
               style={{
                  color: "white",
                  fontSize: "16px",
                  width: "320px",
                  height: "120px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  textAlign: "center",
                  cursor: "pointer",
                  pointerEvents: "auto",
               }}>
               UI (you can pointer over)
            </button>
         </main>
      </Canvas>
   );
}
