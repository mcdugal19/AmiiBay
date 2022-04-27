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
      SELECT * FROM products
      ORDER BY id;
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

async function getProductsByGame(game) {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM products
      WHERE game=$1;
    `,
      [game]
    );

    return rows;
  } catch (error) {
    console.error("Problem getting product by game...", error);
  }
}

async function updateProduct(fields = {}) {
  const { id } = fields;
  delete fields.id;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 2}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [product],
    } = await client.query(
      `
        UPDATE products
        SET ${setString}
        WHERE id=$1
        RETURNING *;
      `,
      [id, ...Object.values(fields)]
    );
    return product;
  } catch (error) {
    console.error("Problem updating product...", error);
  }
}

async function deleteProduct(id) {
  try {
    await client.query(
      `
      DELETE FROM products
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );
    const deleted = {
      id: parseInt(id),
      message: "Successfully deleted product!",
    };
    return deleted;
  } catch (error) {
    console.error("Problem deleting product...", error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByGame,
  updateProduct,
  deleteProduct,
};
