/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    typescript:{
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'kapbjunwvfichcrltzpj.supabase.co',
            port: '',
          },
        ],
      },
    }

module.exports = nextConfig
