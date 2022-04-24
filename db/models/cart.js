const client = require("../client");

async function addToCart({ userId, productId, quantity = 1 }) {
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

async function getCartByUserId(userId) {
  try {
    const { rows } = await client.query(
      `
            SELECT * FROM cart
            WHERE "userId"=$1;
        `,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error("Problem getting cart by userId...", error);
  }
}

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

module.exports = {
  addToCart,
  removeFromCart,
  changeProductQuantity,
  getCartByUserId,
  clearUserCart,
};
