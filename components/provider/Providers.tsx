"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import QueryProvider from "./QueryProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  );
};

export default Providers;
