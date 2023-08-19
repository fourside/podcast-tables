import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/globals.css";

const notoSansJp = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "podcast tables",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={notoSansJp.className}>
        {children}
        <div id="toast" />
        <div id="modal" />
      </body>
    </html>
  );
}
