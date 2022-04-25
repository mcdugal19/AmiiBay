const { TestScheduler } = require("jest");
const {
  client,
  // declare your model imports here
  // for example, User
  Products,
  User,
  Cart,
} = require("./");
const fetchAmiibos = require("./seedAmiibos");

async function buildTables() {
  try {
    client.connect();

    await client.query(`
    DROP TABLE IF EXISTS guest_orders;
    DROP TABLE IF EXISTS products_categories;
    DROP TABLE IF EXISTS users_orders;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
    
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false
    );

    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      variation VARCHAR(255),
      game VARCHAR(255),
      image VARCHAR(255),
      description VARCHAR(255),
      price MONEY NOT NULL
    );

    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "userId" INTEGER REFERENCES users(id),
      title VARCHAR(255) NOT NULL,
      post VARCHAR(255) NOT NULL,
      rating INTEGER DEFAULT null
    );

    CREATE TABLE users_orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id)
    );

    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER
    );
    `);
    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  console.log("Seeding database...");
  console.log("Seeding products...");
  try {
    const amiibos = await fetchAmiibos();
    const products = await Promise.all(
      amiibos.map((amiibo) => {
        const product = Products.createProduct(amiibo);
        return product;
      })
    );
    if (products.length > 0) {
      console.log("Seeded products!");
    }

    console.log("Seeding users...");

    const usersToCreate = [
      { username: "derk", password: "test", email: "asd2f@gmail.com" },
      { username: "Joel", password: "test", email: "asd321f@gmail.com" },
      { username: "Ederne", password: "test", email: "as1asddf@gmail.com" },
      { username: "Zinoviy", password: "test", email: "asdfef@gmail.com" },
      { username: "Theodosios", password: "test", email: "aasdfsdf@gmail.com" },
      { username: "Hardwin", password: "test", email: "aedfssdf@gmail.com" },
      { username: "Alard", password: "test", email: "asefsdfdf@gmail.com" },
      { username: "Sinem", password: "test", email: "asdsdff@gmail.com" },
      { username: "Zhivko", password: "test", email: "aersdf@gmail.com" },
      { username: "Mari", password: "test", email: "arerwsdf@gmail.com" },
      { username: "Ivanka", password: "test", email: "asdasdfsf@gmail.com" },
    ];

    const users = await Promise.all(usersToCreate.map(User.createUser));
    console.log("Seeded users!");

    const admin = await User.updateUser({ id: 1, isAdmin: true });
    console.log("Updated user 1 to admin: ", admin);

    const cartEntriesToCreate = [
      { userId: 2, productId: 1, quantity: 1 },
      { userId: 2, productId: 2, quantity: 1 },
      { userId: 2, productId: 3, quantity: 1 },
      { userId: 4, productId: 5, quantity: 10 },
      { userId: 4, productId: 6, quantity: 3 },
      { userId: 4, productId: 100, quantity: 9 },
      { userId: 5, productId: 52, quantity: 1 },
      { userId: 5, productId: 64, quantity: 1 },
      { userId: 5, productId: 69, quantity: 1 },
    ];

    const cartEntries = await Promise.all(
      cartEntriesToCreate.map(Cart.addToCart)
    );
    console.log("Seeded cart entries!");

    console.log("Seeded database!");
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    console.error("Problem seeding database...", error);
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
