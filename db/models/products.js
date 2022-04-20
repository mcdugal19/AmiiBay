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

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM products;
    `);
    return rows;
  } catch (error) {
    console.error("Problem getting products...", error);
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * FROM products
      WHERE id=$1;
    `,
      [id]
    );
    return product;
  } catch (error) {
    console.error("Problem getting product by id...", error);
  }
}

module.exports = { createProduct, getAllProducts, getProductById };
