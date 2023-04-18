import { decode } from "he";

export function stripHtmlElement(html: string): string {
  const decoded = decode(html);
  return decoded.replace(/(<([^>]+)>)/gi, "");
}

export function decodeHtml(htmlString: string): string {
  return decode(htmlString);
}
