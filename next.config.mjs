/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'http',
              hostname: '192.168.2.27',
              port: '8123',
              pathname: '/api/image_proxy/**',
            },
          ],
    }
};

export default nextConfig;
