import { precompute } from "flags/next";
import { NextResponse, type NextRequest } from "next/server";
import { precomputedFlags } from "./lib/flags";

export async function proxy(request: NextRequest) {
  const code = await precompute(precomputedFlags);

  const nextUrl = new URL(
    `/${code}${request.nextUrl.pathname}${request.nextUrl.search}`,
    request.url
  );

  return NextResponse.rewrite(nextUrl, { request });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.well-known|.*\\.png$).*)"],
};
