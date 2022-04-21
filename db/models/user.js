// grab our db client connection to use with our adapters
const client = require("../client");

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
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password, email)
    VALUES ($1, $2, $3)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `,
      [username, password, email]
    );
    delete user.password;
    return user;
  } catch (error) {
    console.error("Problem creating user", error);
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE id = $1
    `,
      [id]
    );

    if (!user) {
      return null;
    }

    delete user.password;
    return user;
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
    WHERE username = $1
    `,
      [username]
    );
    return user;
  } catch (error) {
    console.error("Problem getting User by Username", error);
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
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    if (setString > 0) {
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

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
};
