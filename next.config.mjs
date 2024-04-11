/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    images : {
        // domains : ['media.istockphoto.com',
        //            'images.unsplash.com',
        //            'avatars.githubusercontent.com',
        //            'shiv-x-dev.s3.ap-south-1.amazonaws.com',
        //           ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "media.istockphoto.com",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "shiv-x-dev.s3.ap-south-1.amazonaws.com",
                pathname: "**"
            }
        ]
    }
};

export default nextConfig;
