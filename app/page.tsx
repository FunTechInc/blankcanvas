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
               height: "100svh",
            }}>
            <button
               style={{
                  color: "white",
                  fontSize: "14px",
                  width: "240px",
                  height: "80px",
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
