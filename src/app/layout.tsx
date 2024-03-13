import Navbar from "@/components/navbar";
import { NextIntlClientProvider, useMessages } from "next-intl";

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



    return (<html lang={locale}>
      <body >
      <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar/>
      {children}
        </NextIntlClientProvider>
      </body>
    </html>);
  }