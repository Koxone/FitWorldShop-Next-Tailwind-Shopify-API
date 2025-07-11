import { NextResponse } from 'next/server';

export async function POST(req) {
  const { cartItems } = await req.json();

  const lines = cartItems.map((item) => ({
    quantity: item.quantity,
    merchandiseId: item.variantId, // asegúrate de tener este campo en el carrito
  }));

  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines,
    },
  };

  try {
    const response = await fetch(process.env.SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token':
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();
    console.log(JSON.stringify(json, null, 2)); // Para debug en consola

    const { cart, userErrors } = json.data.cartCreate;

    if (userErrors.length > 0) {
      console.error('Shopify cartCreate errors:', userErrors);
      return NextResponse.json(
        { error: 'Error creating checkout', details: userErrors },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: cart.checkoutUrl });
  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
