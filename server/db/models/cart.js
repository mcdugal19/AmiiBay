const client = require("../client");

// SQL query to add item to cart
async function addToCart({ userId, productId, quantity }) {
  try {
    const {
      rows: [cartEntry],
    } = await client.query(
      `
            INSERT INTO cart ("userId", "productId", quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [userId, productId, quantity]
    );
    return cartEntry;
  } catch (error) {
    console.error("Problem adding product to cart...", error);
  }
}

// SQL query to delete item from user's cart
async function removeFromCart(userId, productId) {
  try {
    const {
      rows: [cartEntry],
    } = await client.query(
      `
            DELETE FROM cart
            WHERE "userId"=$1
            AND "productId"=$2
            RETURNING *;
        `,
      [userId, productId]
    );
    return cartEntry;
  } catch (error) {
    console.error("Problem removing product from cart...", error);
  }
}

// SQL query to update the quantity of a product in the user's cart
async function changeProductQuantity({ userId, productId, quantity }) {
  try {
    const {
      rows: [cartEntry],
    } = await client.query(
      `
            UPDATE cart
            SET "quantity"=$1
            WHERE "userId"=$2
            AND "productId"=$3
            RETURNING *;
        `,
      [quantity, userId, productId]
    );
    return cartEntry;
  } catch (error) {
    console.error("Problem changing quantity...", error);
  }
}

// SQL query to remove all items from cart table for specific user
async function clearUserCart(userId) {
  try {
    const { rows } = await client.query(
      `
            DELETE FROM cart
            WHERE "userId"=$1
            RETURNING *;
        `,
      [userId]
    );

    return rows && rows.length > 0 ? true : false;
  } catch (error) {
    console.error("Problem clearing user's cart...", error);
  }
}

// SQL query to clear product from all carts, used when deleting a product from database
async function clearProductFromAllCarts(productId) {
  try {
    const { rows } = await client.query(
      `
            DELETE FROM cart
            WHERE "productId"=$1
            RETURNING *;
        `,
      [productId]
    );

    return rows && rows.length > 0 ? true : false;
  } catch (error) {
    console.error("Problem clearing carts containing product...", error);
  }
}

module.exports = {
  addToCart,
  removeFromCart,
  changeProductQuantity,
  clearUserCart,
  clearProductFromAllCarts,
};
