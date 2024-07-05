import "the-new-css-reset/css/reset.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
   title: "blankcanvas | 🎨 Blank canvas for WebGL",
   description: "🎨 Blank canvas for WebGL",
};

import Canvas from "./BlankCanvas";
import { AppHooks } from "./app-hooks";

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html
         lang="en"
         style={{
            height: "100svh",
            overflow: "hidden",
            userSelect: "none",
            touchAction: "pan-y pan-x",
         }}>
         <body className={inter.className}>
            <Canvas>{children}</Canvas>
         </body>
         <AppHooks />
      </html>
   );
}

export { metadata };
