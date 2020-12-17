import NextDocument, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";

class Document extends NextDocument {

  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return await NextDocument.getInitialProps(ctx)
  }

  render(): JSX.Element {
    return (
      <Html lang={"ja"}>
        <Head>
          <link rel="preload" href="/fonts/NotoSansJP-Regular.otf" as="font" type="font/otf" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
