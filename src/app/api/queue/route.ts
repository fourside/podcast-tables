import jsonwebtoken from "jsonwebtoken";
import { recordProgramSchema, recordProgramsSchema } from "../../../lib/schema";

const queueEndpoint = process.env.QUEUE_ENDPOINT ?? unset();
const jwtSecret = process.env.JWT_SECRET ?? unset();

export async function GET(request: Request): Promise<Response> {
  const user = request.headers.get("x-login-user");
  if (user === null) {
    return new Response(JSON.stringify({ message: "error" }), { status: 401 });
  }

  const res = await fetch(`${queueEndpoint}/tasks`, {
    headers: { Authorization: `Bearer ${createJwt(user)}` },
  });
  const json = await res.json();
  const result = recordProgramsSchema.safeParse(json);
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
  const user = request.headers.get("x-login-user");
  if (user === null) {
    return new Response(JSON.stringify({ message: "error" }), { status: 401 });
  }

  try {
    const res = await fetch(`${queueEndpoint}/tasks`, {
      method: "POST",
      headers: { Authorization: `Bearer ${createJwt(user)}` },
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

function createJwt(user: string): string {
  const now = new Date();
  return jsonwebtoken.sign(
    {
      sub: crypto.randomUUID(),
      name: user,
      iss: "podcast-tables",
      iat: Math.floor(now.getTime() / 1000),
      exp: Math.floor(new Date(2100, 1, 1).getTime() / 1000),
      nbf: Math.floor(now.getTime() / 1000),
      aud: "podcast-task",
    },
    jwtSecret,
    { algorithm: "HS512" }
  );
}

function unset(): never {
  throw new Error();
}
