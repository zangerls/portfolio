import createNextIntlPlugin from "next-intl/plugin"
import { NextConfig } from "next"

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
