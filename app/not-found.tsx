"use client"

import "./globals.css"
import Error from "next/error"

// Renders when a request path doesn't match the next-intl middleware matcher
// (e.g. paths containing a dot). Must include its own <html>/<body>.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  )
}
