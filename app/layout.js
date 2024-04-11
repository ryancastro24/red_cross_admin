import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
const poppins = Poppins({weight: ["100","200","300","400","500","600","700"]})

export const metadata = {
  title: "Red Cross Cavite",
  description: "sample description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{backgroundColor:"#0C0B0B"}} className={poppins.className}>

        <Providers>
         {children}
        
        </Providers>
        </body>
    </html>
  );
}
