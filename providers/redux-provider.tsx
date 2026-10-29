"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { fetchProfile } from "@/store/slices/authSlice";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          // Trigger profile fetch to hydrate `auth.user` as soon as possible
          store.dispatch(fetchProfile() as any);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
