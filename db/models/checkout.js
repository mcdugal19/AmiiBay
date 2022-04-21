const client = require("../client");

async function createUser_Order({
    userId,
    productId
}) {
    try {
        const { rows: [order] } = await client.query(
            `
            INSERT INTO users_orders (userId, productId)
            VALUES ($1, $2)
            RETURNING *;
            `
            [userId, productId]
        );
        return order;
    } catch (error) {
        console.error("Problem creating order...", error);
    }
}

module.exports = {
    createUser_Order
};