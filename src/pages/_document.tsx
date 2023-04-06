import NextDocument, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return await NextDocument.getInitialProps(ctx);
  }

  render(): JSX.Element {
    return (
      <Html lang={"ja"}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="toast" />
          <div id="modal" />
        </body>
      </Html>
    );
  }
}

export default Document;
