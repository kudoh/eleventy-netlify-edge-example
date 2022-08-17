import { decode } from "https://deno.land/std/encoding/base64.ts";

const unauthorized = new Response(null, {
  status: 401,
  headers: {
    "WWW-Authenticate": "Basic",
  },
});
export default async (request, { next, log }) => {
  const authorization = request.headers.get("authorization");
  if (!authorization) return unauthorized;
  const [, userpassword] = authorization.split(" ");
  const [user, password] = new TextDecoder("utf-8")
    .decode(decode(userpassword))
    .split(":");
  if (user === "mamezou" && password === "password123") {
    log("authentication succeeded!!");
    return next();
  }
  log("authentication failed...");
  return unauthorized;
};
