const production = {
  url: "https://team-ram-rod.herokuapp.com/api",
};

const development = {
  url: "http://localhost:3000/api",
};

export const config =
  process.env.NODE_ENV === "development" ? development : production;