export async function GET() {
  // Leer variables de entorno
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken =
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  // Query GraphQL
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    // Fetch a Shopify
    const response = await fetch(`https://${domain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    // Parsear la respuesta
    const json = await response.json();

    // Imprimir todo el JSON completo
    console.log('🔎 Respuesta completa de Shopify:');
    console.dir(json, { depth: null });

    // Si Shopify devuelve errores
    if (json.errors) {
      console.error('❌ Errores devueltos por Shopify:', json.errors);
      return new Response(JSON.stringify({ errors: json.errors }), {
        status: 500,
      });
    }

    // Imprimir sólo la parte que nos interesa para explorarlo
    console.log('✅ Productos recibidos:');
    console.dir(json.data.products, { depth: null });

    // Retornar al navegador el JSON de productos sin modificar
    return new Response(JSON.stringify(json.data.products), { status: 200 });
  } catch (error) {
    console.error('❌ Error de conexión o de parseo:', error);
    return new Response(
      JSON.stringify({ error: 'Error al conectar con Shopify' }),
      { status: 500 }
    );
  }
}
