import type { NextConfig } from 'next'
import nextra from 'nextra'

const isProd = process.env.NODE_ENV === 'production'

const withNextra = nextra({
  contentDirBasePath: '/docs',
})

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/respawn-ostfold' : '',
  assetPrefix: isProd ? '/respawn-ostfold/' : '',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/respawn-ostfold' : '',
  },
}

export default withNextra(nextConfig)
