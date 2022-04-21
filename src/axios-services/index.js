import axios from "axios";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

// PRODUCTS
export async function fetchAllProducts() {
  try {
    const { data: products } = await axios.get("/api/products");
    return products;
  } catch (error) {
    console.error(error);
  }
}

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function getMe() {
  try {
    const response = await fetch("api/users/me");
    const data = response.json();
    return data
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser( username, password ) {
  try {
    const response = await fetch("api/users/login", {
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({
        username,
        password
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw err;
  }
}

export async function registerUser( username, password, email ) {
  try {
    const response = await fetch("api/users/register", {
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({
        username,
        password,
        email
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw err;
  }
}
