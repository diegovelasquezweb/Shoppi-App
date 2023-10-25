import { SHOPIFY_API_URL, SHOPIFY_ACCESS_TOKEN } from "@env";

const fetchProductsJson = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data from ${url}`);
  }

  return await response.json();
};

export const getProducts = async (metafieldKeys = []) => {
  try {
    const productsUrl = `${SHOPIFY_API_URL}/products.json`;
    const productsData = await fetchProductsJson(productsUrl);

    const productsWithMetafields = await Promise.all(
      productsData.products.map(async (product) => {
        const metafieldsUrl = `${SHOPIFY_API_URL}/products/${product.id}/metafields.json`;
        const metafieldsData = await fetchProductsJson(metafieldsUrl);

        const metafields = {};

        for (const key of metafieldKeys) {
          const metafield = metafieldsData.metafields.find(
            (metafield) => metafield.key === key
          );
          metafields[key] = metafield ? metafield.value : null;
        }

        product.customMetafields = metafields;
        return product;
      })
    );

    return productsWithMetafields;
  } catch (error) {
    throw new Error("Error: " + error.message);
  }
};
