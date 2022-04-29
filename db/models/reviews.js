const client = require("../client");

async function createReview({ productId, userId, title, post, rating }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
        INSERT INTO reviews ("productId", "userId", title, post, rating)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
      [productId, userId, title, post, rating]
    );
    return review;
  } catch (error) {
    console.error("Problem creating review...", error);
  }
}

async function editReview(fields = {}) {
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
      rows: [review],
    } = await client.query(
      `
          UPDATE reviews
          SET ${setString}
          WHERE id=$1
          RETURNING *;
        `,
      [id, ...Object.values(fields)]
    );
    return product;
  } catch (error) {
    console.error("Problem editing review...", error);
  }
}

async function deleteReview(id) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            DELETE FROM reviews
            WHERE id=$1
            RETURNING *;
        `,
      [id]
    );
    return review;
  } catch (error) {
    console.error("Problem deleting review...", error);
  }
}

async function getReviewsByUserId(userId) {
  try {
    const { rows } = client.query(
      `
            SELECT * FROM reviews
            WHERE "userId"=$1;
        `,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error("Problem getting reviews by user ID...", error);
  }
}

async function deleteReviewsByUserId(userId) {
  try {
    const { rows } = client.query(
      `
        DELETE FROM reviews
        WHERE "userId"=$1
        RETURNING *;
      `,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error("Problem deleting reviews by user ID...", error);
  }
}

async function userReviewExists(userId, productId) {
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM reviews
        WHERE "userId"=$1
        AND "productId"=$2;
    `,
      [userId, productId]
    );

    console.log("in check, length:", rows.length);
    return rows.length > 0;
  } catch (error) {
    console.error("Problem checking reviews by user on product...", error);
  }
}

module.exports = {
  createReview,
  editReview,
  deleteReview,
  getReviewsByUserId,
  deleteReviewsByUserId,
  userReviewExists,
};
