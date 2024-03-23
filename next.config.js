/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
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
            hostname: 'hsmkjlshupdxrgqayccm.supabase.co',
            port: '',
          },
        ],
      },
    }

module.exports = nextConfig
