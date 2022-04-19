const client = require("../client");

async function createProduct({
  name,
  variation,
  game,
  image,
  description,
  price,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products (name, variation, game, image, description, price)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `,
      [name, variation, game, image, description, price]
    );
    return product;
  } catch (error) {
    console.error("Problem creating product entry...", error);
  }
}

module.exports = { createProduct };
