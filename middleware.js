// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { cookies, nextUrl } = request;
  const clientSession = cookies.get("clientSession");
  const targetUrl = new URL("/?shopRef=tYmOsGUXaN5bjktXXDX2IR", request.url);

  // Expanded list of paths and file types to ignore
  const ignoredPaths = [
    "/_next",
    "/api",
    "/static",
    "/images",
    "/fonts",
    "/favicon.ico",
  ];

  const ignoredExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "svg",
    "webp",
    "css",
    "js",
    "woff",
    "woff2",
    "ttf",
    "eot",
    "ico",
  ];

  // Check if the request should be ignored
  const shouldIgnore =
    ignoredPaths.some((path) => nextUrl.pathname.startsWith(path)) ||
    ignoredExtensions.some((ext) => nextUrl.pathname.endsWith(`.${ext}`));

  if (shouldIgnore) {
    return NextResponse.next();
  }

  // Check if the request is already on the target URL
  if (nextUrl.href === targetUrl.href) {
    return NextResponse.next();
  }

  // Check if the clientSession cookie is present
  if (!clientSession) {
    // Redirect to the specified URL if the cookie is not present
    return NextResponse.redirect(targetUrl);
  }

  // Allow the request to continue if the cookie is present
  return NextResponse.next();
}
