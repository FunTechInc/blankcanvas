import { useCallback } from "react";
import { useThree } from "@react-three/fiber";

export function useDownload(file: string = "image") {
   const { gl } = useThree();
   const downloadImage = useCallback(
      (filename = `${file}.png`) => {
         const image = gl.domElement.toDataURL("image/png");
         const link = document.createElement("a");
         link.download = filename;
         link.href = image;
         link.click();
         link.remove();
      },
      [gl, file]
   );
   return downloadImage;
}
