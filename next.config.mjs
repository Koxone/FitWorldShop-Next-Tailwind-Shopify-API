/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // recomendado para detectar errores silenciosos

  images: {
    domains: ['cdn.shopify.com'],
  },

  // Para habilitar trazas reales en errores de producción (Vercel o build)
  productionBrowserSourceMaps: true,

  // Si usas server actions en Next.js 15+
  experimental: {
    serverActions: {}, // corregido: usa objeto vacío en lugar de boolean
  },
};

export default nextConfig;
