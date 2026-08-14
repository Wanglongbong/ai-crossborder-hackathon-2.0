import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
};

export const client = hc<AppType>(getBaseUrl());
