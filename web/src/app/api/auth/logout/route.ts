import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const redirectUrl = new URL("/", request.url);

  return NextResponse.redirect(redirectUrl, {
    headers: {
      "Set-Cookie": `nlw-spacetime-token=; Path=/; max-age=0`,
    },
  });
}
