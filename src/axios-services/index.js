import axios from "axios";
const api_url = "http://localhost:3000";
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

export async function addNewProduct(productObj) {
  try {
    console.log(productObj, "THIS IS IN AXIOS");
    const response = await fetch(`${api_url}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productObj }),
    });
    console.log(response, "the response");
    const data = await response.json();
    console.log(data, "data");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${api_url}/products/${productId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(productId, updateObj) {
  try {
    const response = await fetch(`${api_url}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateObj),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (error) {
    console.error(error);
    return { healthy: false };
  }
}

export async function getMe() {
  try {
    const response = await fetch(`${api_url}/api/users/me`);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${api_url}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    console.log(data, "data in loginUser");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(username, password, email) {
  try {
    const response = await fetch(`${api_url}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });

    const data = await response.json();
    console.log(data, "data in registeruser");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    await fetch(`${api_url}/api/users/logout`);
  } catch (error) {
    throw error;
  }
}

// export async function processPayment() {
//   try {
//     await fetch(`${api_url}`)
//   } catch (error) {
//     throw error;
//   }
// }

export async function getAllUsers() {
  try {
    const response = await fetch(`${api_url}/api/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function giveAdminToUserId(id) {
  try {
    const response = await fetch(`${api_url}/api/users/admin/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const response = await fetch(`${api_url}/api/users/admin/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "response");
    const data = await response.json();
    console.log(data, "data");
    return data;
  } catch (error) {
    throw error;
  }
}
