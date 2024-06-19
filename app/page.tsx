export default function Home() {
   return (
      <div
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
               backgroundColor: "rgba(0,0,0,1)",
               textAlign: "center",
               cursor: "pointer",
               pointerEvents: "auto",
               mixBlendMode: "color",
            }}>
            UI (you can pointer over)
         </button>
      </div>
   );
}
