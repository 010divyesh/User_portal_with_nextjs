import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Navbar from "@/components/navbar";
import { NextIntlClientProvider, useLocale } from "next-intl";
import {useMessages} from 'next-intl';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "USERS PORTAL",
  description: "Generated by create next app",
};

interface RootLayoutProps{
  children: React.ReactNode;
  params:{
    locale:string;
  };
}

export default function RootLayout({
  children,
  params:{ locale },
}: Readonly<RootLayoutProps>) {
  
   const messages = useMessages();
  
  return (
    <html lang={locale}>
      <body className={inter.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {/* <Navbar/> */}
        <div className="background-container">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}