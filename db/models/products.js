const client = require("../client");

async function createProduct({
  name,
  variation,
  game,
  image,
  description,
  price,
  inventory,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products (name, variation, game, image, description, price, inventory)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `,
      [name, variation, game, image, description, price, inventory]
    );
    product.overallRating = null;
    product.reviews = [];
    return product;
  } catch (error) {
    console.error("Problem creating product entry...", error);
  }
}

function mapOverProducts(rows) {
  let products = {};

  for (let row of rows) {
    if (!products[row.id]) {
      products[row.id] = {
        id: row.id,
        name: row.name,
        variation: row.variation,
        game: row.game,
        image: row.image,
        description: row.description,
        price: row.price,
        inventory: row.inventory,
        overallRating: row.overallRating
          ? +row.overallRating
          : row.overallRating,
        reviews: [],
      };
      if (row.reviewId) {
        products[row.id].reviews.push({
          id: row.reviewId,
          author: {
            userId: row.authorId,
            username: row.authorName,
          },
          title: row.title,
          post: row.post,
          rating: row.rating,
        });
      }
    } else {
      products[row.id].reviews.push({
        id: row.reviewId,
        author: {
          userId: row.authorId,
          username: row.authorName,
        },
        title: row.title,
        post: row.post,
        rating: row.rating,
      });
    }
  }
  return Object.values(products);
}

async function getAllProductsWithReviews() {
  try {
    const { rows } = await client.query(`
      SELECT products.*,
        (SELECT AVG(reviews.rating)
          FROM reviews
          WHERE "productId"=products.id) AS "overallRating",
        reviews.id AS "reviewId",
        users.id AS "authorId",
        users.username AS "authorName",
        reviews.title,
        reviews.post,
        reviews.rating
      FROM products
      LEFT JOIN reviews
      ON products.id=reviews."productId"
      LEFT JOIN users
      ON reviews."userId"=users.id
      ORDER BY products.id
    `);

    return mapOverProducts(rows);
  } catch (error) {
    console.error("Problem getting products with reviews...", error);
  }
}

async function getAllProducts() {
  try {
    // const { rows } = await client.query(`
    //   SELECT * FROM products
    //   ORDER BY id;
    // `);
    return await getAllProductsWithReviews();
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

const { deleteReviewsByProductId } = require("./reviews");
const { clearProductFromAllCarts } = require("./cart");

async function deleteProduct(id) {
  try {
    const reviews = await deleteReviewsByProductId(id);
    const cart = await clearProductFromAllCarts(id);
    const {
      rows: [product],
    } = await client.query(
      `
      DELETE FROM products
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );
    product.reviews = reviews;
    const deleted = {
      id: product.id,
      product,
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
  getAllProductsWithReviews,
};
