const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();

    await client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    );

    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      description VARCHAR(255),
      price MONEY,
      image VARCHAR(255)
    );

    `)
    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

// fetch product information from product api
async function productFetch(){
  try {
    const response = await fetch("some api.com")
    const data = response.json()
    // optimize objects with correct key/value information
    return data //array of objects
  } catch (error) {
    throw error
  }
}

async function populateInitialData() {
  try {
    const products = await productFetch()
    products.map(async (product)=>{
      return Products.createProductEntry(product)
      
    })
    
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  // .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
