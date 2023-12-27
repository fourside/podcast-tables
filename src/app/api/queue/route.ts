import { recordProgramSchema, recordProgramsSchema } from "../../../lib/schema";

const queueEndpoint = process.env.QUEUE_ENDPOINT ?? unset();

export async function GET(request: Request): Promise<Response> {
  const res = await fetch(`${queueEndpoint}/tasks`, {
    headers: { Authorization: basicAuthHeader() },
  });
  const json = await res.json();
  const result = recordProgramsSchema.safeParse(JSON.parse(json));
  if (result.success) {
    return new Response(JSON.stringify(result.data));
  }
  console.error(json, result.error);
  return new Response(JSON.stringify({ message: "error " }), { status: 500 });
}

export async function POST(request: Request): Promise<Response> {
  const json = await request.json();
  const result = recordProgramSchema.safeParse(json);
  if (!result.success) {
    console.error(result.error);
    return new Response(JSON.stringify({ message: "error" }), { status: 400 });
  }
  try {
    const res = await fetch(`${queueEndpoint}/tasks`, {
      method: "POST",
      headers: { Authorization: basicAuthHeader() },
      body: JSON.stringify(result.data),
    });
    const body = await res.text();
    if (!res.ok) {
      console.error(body);
      return new Response(JSON.stringify({ message: "error" }), { status: 500 });
    }
    return new Response(JSON.stringify({ message: "success" }));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "error" }), { status: 500 });
  }
}

function basicAuthHeader(): string {
  const user = process.env.QUEUE_ENDPOINT_USERNAME ?? unset();
  const pass = process.env.QUEUE_ENDPOINT_PASSWORD ?? unset();
  const auth = Buffer.from(`${user}:${pass}`).toString("base64");
  return `Basic ${auth}`;
}

function unset(): never {
  throw new Error();
}
