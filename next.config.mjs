/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false, // hides the round "N" dev badge
  env: { NEXT_PUBLIC_BUILD_TIME: new Date().toISOString() }, // shown in the preview notice
};
export default nextConfig;
