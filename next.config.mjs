/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // recomendado para detectar errores silenciosos
  swcMinify: true, // recomendado para builds más rápidos y pequeños

  images: {
    domains: ['cdn.shopify.com'],
  },

  // Para habilitar trazas reales en errores de producción (Vercel o build)
  productionBrowserSourceMaps: true,

  // Si deseas futuras características estables
  experimental: {
    serverActions: true, // solo si usas server actions, remueve si no los usas
  },
};

export default nextConfig;
