"use client"

import { ClerkProvider } from "@clerk/nextjs"

export default function ClerkWrapper({ children }) {
  return (
    <ClerkProvider afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL}>
      {children}
    </ClerkProvider>
  )
}