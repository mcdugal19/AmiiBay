// These constants are kept here for reference
// and to keep the code ordered and neat.
// The config export allows the app to distinguish
// between individual environments.


const production = {
  url: "https://amiibo-mcdugal19.herokuapp.com/",
};

const development = {
  url: "http://localhost:3000/api",
};

export const config =
  process.env.NODE_ENV === "development" ? development : production;
