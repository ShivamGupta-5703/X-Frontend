/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    images : {
        domains : ['media.istockphoto.com',
                   'images.unsplash.com',
                   'avatars.githubusercontent.com',
                  ],
        remotePatterns : [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname:"**"
            },
        ]
    }
};

export default nextConfig;
