const {
  client,
  // declare your model imports here
  // for example, User
  Products,
} = require("./");
const fetchAmiibos = require("./seedAmiibos");

async function buildTables() {
  try {
    client.connect();

    await client.query(`
    DROP TABLE IF EXISTS users_orders;
    DROP TABLE IF EXISTS guest_orders;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS products_categories;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
    
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
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

    CREATE TABLE categories(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );

    CREATE TABLE products_categories(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "categoryId" INTEGER REFERENCES categories(id),
      CONSTRAINT product_category UNIQUE ("productId", "categoryId")
    );

    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "userId" INTEGER REFERENCES users(id),
      title VARCHAR(255) NOT NULL,
      post VARCHAR(255) NOT NULL,
      rating INTEGER DEFAULT null
    );

    CREATE TABLE guest_orders(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id)
    );

    CREATE TABLE users_orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id)
    );
    `);
    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
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

    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    console.error("Problem seeding products...", error);
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
