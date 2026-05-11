// Required as the root not-found page renders outside of `[locale]`.
// This layout is intentionally minimal — the real layout lives in `[locale]/layout.tsx`.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
