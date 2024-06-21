// src/lib/cookies.ts
import { serialize, parse } from "cookie";
import { NextRequest } from "next/server";


export const setCookie = (name: string, value: string, options = {}) => {
  return serialize(name, value, options);
};


export const parseClientCookies = () => {
  if (typeof document !== "undefined") {
    const cookieHeader = document.cookie;
    return parse(cookieHeader);
  }
  return {};
};

export const clearCookie = (name: string) => {
  document.cookie = `${name}=; max-age=0; path=/; secure; samesite=strict;`;
};