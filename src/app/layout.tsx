import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Telegram Web Clone",
  description:
    "A web application that replicates the features of Telegram, allowing users to chat in real time.",

  openGraph: {
    title: "Telegram Web Clone",
    description: "A minimalistic telegram web clone",

  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} dark:bg-primary-dark bg-primary-light antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
