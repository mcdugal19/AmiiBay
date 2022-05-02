const client = require("../client");

// SQL query to add a user order to users_orders table for order history
async function addToOrders({ userId, productId, quantity }) {
  try {
    const {
      rows: [orderEntry],
    } = await client.query(
      `
            INSERT INTO users_orders ("userId", "productId", quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [userId, productId, quantity]
    );
    return orderEntry;
  } catch (error) {
    console.error("Problem adding product to cart...", error);
  }
}

module.exports = {
  addToOrders,
};
