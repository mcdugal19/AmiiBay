// grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
async function getAllUsers() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM users;
    `);
    return rows;
  } catch (error) {
    console.error("Problem getting all users", error);
  }
}

async function createUser({ username, password, email }) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password, email)
    VALUES ($1, $2, $3)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `,
      [username, hashedPassword, email]
    );
    delete user.password;
    user.cart = [];
    return user;
  } catch (error) {
    console.error("Problem creating user", error);
  }
}

async function getUserById(id) {
  try {
    return await getUserWithCart(id);
    // const {
    //   rows: [user],
    // } = await client.query(
    //   `
    // SELECT * FROM users
    // WHERE id = $1
    // `,
    //   [id]
    // );

    // if (!user) {
    //   return null;
    // }

    // delete user.password;
    // user.cart = [];
    // return user;
  } catch (error) {
    console.error("Problem getting user by id", error);
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE username = $1;
    `,
      [username]
    );
    return user;
  } catch (error) {
    console.error("Problem getting User by Username", error);
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      const {
        rows: [user],
      } = await client.query(
        `
                SELECT *
                FROM users
                WHERE username = $1
                AND password = $2;
            `,
        [username, hashedPassword]
      );
      return await getUserWithCart(user.id);
      // delete user.password;
      // user.cart = [];
      // return user;
    } else {
      throw new Error("Passwords did not match...");
    }
  } catch (error) {
    console.error("Problem getting user...", error);
  }
}

async function deleteUser(id) {
  try {
    await client.query(
      `
    DELETE FROM users
    WHERE id = $1
    `,
      [id]
    );
  } catch (error) {
    console.error("Problem deleting user", error);
  }
}

async function updateUser(fields = {}) {
  const { id } = fields;
  delete fields.id;
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    if (setString.length > 0) {
      const {
        rows: [user],
      } = await client.query(
        `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *
      `,
        Object.values(fields)
      );
      return user;
    }
  } catch (error) {
    console.error("Problem updating user info", error);
  }
}

function mapOverUserRows(rows) {
  let user = {};

  for (let row of rows) {
    if (!user.id) {
      user = {
        id: row.id,
        username: row.username,
        email: row.email,
        isAdmin: row.isAdmin,
        cart: [],
      };
      if (row.productId) {
        user.cart.push({
          id: row.productId,
          name: row.name,
          variation: row.variation,
          game: row.game,
          image: row.image,
          description: row.description,
          price: row.price,
          quantity: row.quantity,
        });
      }
    } else {
      user.cart.push({
        id: row.productId,
        name: row.name,
        variation: row.variation,
        game: row.game,
        image: row.image,
        description: row.description,
        price: row.price,
        quantity: row.quantity,
      });
    }
  }

  return user;
}

async function getUserWithCart(id) {
  try {
    const { rows } = await client.query(
      `
      SELECT users.id,
        users.username,
        users.email,
        users."isAdmin",
        products.id AS "productId",
        products.name,
        products.variation,
        products.game,
        products.image,
        products.description,
        products.price,
        cart.quantity
      FROM users
      LEFT JOIN cart
      ON users.id=cart."userId"
      LEFT JOIN products
      ON cart."productId"=products.id
      WHERE users.id=$1;
    `,
      [id]
    );
    return mapOverUserRows(rows);
  } catch (error) {
    console.error("Problem getting user with cart...", error);
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE email = $1
    `,
      [email]
    );
    return user;
  } catch (error) {
    console.error("Problem with getting user by email...", error);
  }
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  getUser,
  getUserWithCart,
  deleteUser,
  getUserByEmail,
};
