// These constants are kept here for reference
// and to keep the code ordered and neat.
// The config export allows the app to distinguish
// between individual environments.


const production = {
  url: "https://amiibo-mcdugal19.herokuapp.com/api",
};

const development = {
  url: "http://localhost:4000/api",
};

// For local development/testing, always use localhost
// Change this to use production URL when deploying
export const config = development;
// export const config = process.env.NODE_ENV === "development" ? development : production;
