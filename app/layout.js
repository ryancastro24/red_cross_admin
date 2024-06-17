import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { OurFileRouter } from "./api/uploadthing/core";









const poppins = Poppins({weight: ["100","200","300","400","500","600","700"]})


export const metadata = {
  title: "Red Cross Cavite",
  description: "sample description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{backgroundColor:"#0C0B0B"}} className={poppins.className}>

      <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(OurFileRouter)}
        />
        <Providers>
         {children}
        
        </Providers>
        </body>
    </html>
  );
}
