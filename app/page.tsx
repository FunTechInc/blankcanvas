import { WebGLCanvas } from "./WebGL";
import s from "./page.module.css";

export default function Home() {
   return (
      <div className={s.main}>
         <WebGLCanvas />
      </div>
   );
}
