/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home-page/',
                permanent: true,
            }
        ]
    },
    trailingSlash: false
};

export default nextConfig;
