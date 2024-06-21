// src/lib/cookies.ts
import { serialize, parse } from "cookie";
import { NextRequest } from "next/server";

// Set a cookie
export const setCookie = (name: string, value: string, options = {}) => {
  return serialize(name, value, options);
};

// Parse cookies from request headers
export const parseCookies = (req: NextRequest) => {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) {
    return {};
  }
  return parse(cookieHeader);
};
