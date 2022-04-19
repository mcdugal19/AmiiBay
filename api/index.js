const express = require("express");
// const { JWT_SECRET } = process.env;

const apiRouter = express.Router();
const jwt = require("jsonwebtoken");

// apiRouter.use(async (req, res, next) => {
//     const prefix = "Bearer ";
//     const auth = req.header("Authorization");

//     if (!auth) {
//       next();
//     } else if (auth.startsWith(prefix)) {
//       const token = auth.slice(prefix.length);

//       try {
//         const { id } = jwt.verify(token, JWT_SECRET);
      
//         if (id) {
//           requestAnimationFrame.user = await getUserById(id);
//           next();
//         }
//       } catch ({ name, message }) {
//         next({ name, message });
//       }
//     } else {
//       next({
//         name: "AuthorizationHeaderError",
//         message: `Authorization token must start with ${prefix}`,
//       });
//     }
// });

// apiRouter.use((req, res, next) => {
//   if (req.user) {
//     console.log("User is set:", req.user);
//   }
//   next();
// });

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// const usersRouter = require("./users");
// apiRouter.use("/users", usersRouter);

// const categoriesRouter = require("./categories");
// apiRouter.use('/categories', categoriesRouter);

// const Guest_OrderRouter = require("./Guest_Order");
// apiRouter.use('/Guest_Order', routinesRouter);

// const Products_CategoriesRouter = require("./Products_Categories");
// apiRouter.use("./Products_Categories", Products_CategoriesRouter);

// const productsRouter = require("./products");
// apiRouter.use('/products', productsRouter);

// const reviewsRouter = require("./reviews");
// apiRouter.use('/reviews', reviewsRouter);

// const User_OrderRouter = require("./User_Order");
// apiRouter.use('/User_Order', User_OrderRouter);



// place your routers here

module.exports = apiRouter;
