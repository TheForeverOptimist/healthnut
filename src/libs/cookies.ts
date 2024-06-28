// src/lib/cookies.ts
import { serialize, parse } from "cookie";
import { NextRequest } from "next/server";


export const setCookie = (name: string, value: string, options = {}) => {
  return serialize(name, value, options);
};


export const parseClientCookies = () => {
  if (typeof window !== "undefined") {
    return document.cookie.split("; ").reduce((prev, current) => {
      const [name, ...value] = current.split("=");
      prev[name] = value.join("=");
      return prev;
    }, {} as Record<string, string>);
  }
  return {};
};

export const clearCookie = (name: string) => {
  document.cookie = `${name}=; max-age=0; path=/; secure; samesite=strict;`;
};