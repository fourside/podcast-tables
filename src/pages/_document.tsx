import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="toast" />
        <div id="modal" />
      </body>
    </Html>
  );
}
