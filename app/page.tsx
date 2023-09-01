import { ThreeCanvas } from "./Canvas";
import s from "./page.module.css";

export default function Home() {
   return (
      <div className={s.main}>
         <ThreeCanvas />
      </div>
   );
}
