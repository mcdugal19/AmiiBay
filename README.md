# Let's Build a Full Stack Application

This full stack app boilerplate consists of:

- an Express web server,
- a PostgreSQL database instance,
- and a React front-end

You'll also find a bunch of convenient commands and workflows that will allow you to develop your app locally and deploy it to heroku. Let's dive in!

# Local Development

## Getting Started

1. Fork and clone this repo to your local machine, then run the following commands to reinitialize your git history from scratch:

```bash
# these commands reset your git history
$ rm -rf .git
$ git init
```

2. Create a bare GitHub repo (no `.gitignore`, `README.md`, `CHANGELOG.md`, or license) and copy the ssh address to assign to your local clone with `git remote add origin <paste-your-ssh-address-here>`

3. `npm install` to add project dependencies to your local machine.

4. Choose a name for your local database instance and edit `db/index.js` to assign the name to `DB_NAME`. Next, run `createdb <your-db-name-goes-here>` from your command line to spin up your database.

5. `npm run start:dev` will build your React app and start your express server in concurrent mode (meaning that both processes run in the same terminal window). Once this command is running, you can start developing! `nodemon` and `react-scripts` will listen to file changes and update continuously (hot-module-reloading).

<em>NB: If you see a `proxy error` message in the terminal, just hard refresh your browser window and you'll be all set.</em>

## Project Structure

```bash
├── .github/workflows
│   └── heroku-deploy.yaml
│  
├── api
│   ├── apiRouter.test.js
│   └── index.js
│
├── db
│   ├── models
│   │   ├── index.js
│   │   └── user.js
│   ├── client.js
│   ├── index.js
│   └── init_db.js
│
├── public
│   └── index.html
│
├── src
│   ├── axios-services
│   │   └── index.js
│   ├── components
│   │   ├── App.js
│   │   └── index.js
│   ├── style
│   │   ├── App.css
│   │   └── index.css
│   └── index.js
│
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

`/db` contains your `index.js` which exports the client instance and your database adapter models, as well as `init_db.js` which should be run when you need to rebuild your tables and seed data.

`/public` and `/src` are the two puzzle pieces for your React front-end. `/public` contains any static files necessary for your front-end. This can include images, a favicon, and most importantly the `index.html` that is the root of your React application.

`src/AJAXFunctions` contains your axios network request adapters. `src/components` contains your React component files.

Inside `/api` you have `index.js` which is responsible for building the `apiRouter` that you'll attach in the express server, and `apiRouter.test.js` which will give you direction on test-driven development for your api. Your React application and Express server use any routes you build in the `/api` directory to send/receive data via JSON, for example, a `usersRouter.js` that will be required and mounted in the `apiRouter.js`.

Rounding things out, we've got the top level `index.js` that creates your Express Server. This should be responsible for setting up your API, starting your server, and connecting to your database. We've also got our `.gitignore`, `package-lock.json`, and `package.json` where you'll find the scripts necessary to get your app off the ground, as well as this `README.md`.

## Command Line Tools

In addition to `start:dev`, `client:build`, `client:dev` and `server:dev`, you have access to `db:build` which rebuilds the database, all the tables, and ensures that there is meaningful data present.

# Deployment

## Setting up Heroku

Setup your heroku project by choosing a site name and provisioning a postgres database. These commands create a heroku project backed by a postgres db instance which will live at https://project-name-goes-here.herokuapp.com. You'll want to replace `project-name-goes-here` with your selected project name.

You'll only need to do this step once, at the outset of your project:

```bash
# create your project
$ heroku create project-name-goes-here
# create your database instance
$ heroku addons:create heroku-postgresql:hobby-dev
```

Next we'll configure your database instance to ignore the `ssl` configuration object our `pg` client instance expects:

```bash
# set ssl mode to no-verify
$ heroku config:set PGSSLMODE=no-verify
# confirm your environment variable has been set
$ heroku config
```

## Configuring GitHub Actions Secrets for CI/CD

We're going to leverage continuous integration and continuous development methodologies, or CI/CD, to deploy your app. To enable CI/CD you'll need to add a few environment variables to your project repo.

Under Settings, choose the Secrets option under Security. You'll see the following dialog, and you'll be able to add a secret by selecting the `New repository secret` button. Once you create a GitHub secret you can never see it again, but you can modify it! We're going to add 3 secrets to our repo:

- `HEROKU_API_KEY`: you'll find this listed in your heroku account settings
- `HEROKU_APP_NAME`: this is the project name you chose above
- `HEROKU_EMAIL`: this is the email address associated with your heroku account

![](/assets/github-actions-secrets.png)

Each project group will elect one person to be the "owner" of the heroku account, and that person's api key and email address will be used to register the secrets above.

**After the bootcamp ends**, you might want to redeploy and make changes to your team's application. Once you've forked this repo to your personal GitHub Account, you can add your own secrets and redeploy under a different heroku app name!

## Deployment

In `.github/workflows` you'll find a YAML, an acronym for "YAML Ain't Markup Language", that triggers an automated deployment by watching your `main` branch: whenever a new pull request is merged to `main`, your app will automagically deploy itself on heroku.

Optionally, you can also trigger this deployment workflow by pushing to the `deploy` branch. Many companies use this pattern to enable hotfixes without going through the lengthy review process of creating a PR and merging it.

Note that this workflow does **not** seed your database. To seed your remote postgres instance, run the following command:

```bash
# this command seeds your remote postgres instance
$ heroku run npm run db:build
```

As you project grows you'll probably want to re-seed and refresh your database from time to time. Rerun this command whenever you want to re-seed.

# AmiiBay Project Repository Structure

**AmiiBay** is a full-stack e-commerce application for selling Amiibo figures (Nintendo collectible gaming figurines). It's built with React, Express, PostgreSQL, and Stripe payment integration.

## Architecture Overview

The project follows a classic **three-tier architecture**:
- **Frontend**: React application (SPA)
- **Backend**: Express.js REST API
- **Database**: PostgreSQL

## Directory Structure Breakdown

### Root Level Files
- **index.js** - Main Express server entry point that:
  - Configures middleware (CORS, Morgan logging, cookie-parser)
  - Serves static React build files
  - Mounts the API router at `/api`
  - Connects to PostgreSQL database
  - Integrates Stripe for payments

- **package.json** - Project dependencies and scripts:
  - Uses React, Express, PostgreSQL (pg), Stripe, JWT authentication, bcrypt
  - Scripts for development (`start:dev`), building (`client:build`), and database setup (`db:build`)

### `/db` - Database Layer
Database configuration and models:
- **client.js** - PostgreSQL client configuration
- **index.js** - Exports database client and all models
- **init_db.js** - Database initialization and table creation script
- **seedAmiibos.js** - Seeds product data (Amiibo figures)

**`/db/models`** - Database adapter functions:
- **user.js** - User authentication and management
- **products.js** - Product CRUD operations
- **cart.js** - Shopping cart functionality
- **orders.js** - Order processing and history
- **reviews.js** - Product review system

### `/api` - Backend REST API
Express routers handling HTTP requests:
- **index.js** - Main API router that:
  - Mounts sub-routers (`/users`, `/products`, `/cart`, `/orders`, `/reviews`)
  - Handles Stripe checkout session creation
- **users.js** - User registration, login, authentication endpoints
- **products.js** - Product listing, search, and management endpoints
- **cart.js** - Cart CRUD operations
- **orders.js** - Order creation and retrieval
- **reviews.js** - Review CRUD operations
- **utils.js** - Shared utility functions (likely JWT verification)

### `/src` - React Frontend

**`/src/components`** - React component hierarchy:

**Main Components:**
- **App.js** - Root component with React Router routes:
  - `/` - All products listing
  - `/product/:productId` - Single product details
  - `/login` & `/register` - Authentication
  - `/cart` - Shopping cart
  - `/admin` - Admin dashboard
  - `/me` - User profile
  - `/success` - Post-checkout success page

**Feature Modules:**
- **`/admin`** - Admin panel for product management:
  - Admin.jsx, AdminTable.jsx
  - AddProduct.jsx, UpdateProduct.jsx, DeleteProduct.jsx, ProductTable.jsx

- **`/cart`** - Shopping cart functionality:
  - Cart.jsx - Main cart display
  - CartItem.jsx - Individual cart items
  - AddToCart.jsx, RemoveItem.jsx, UpdateQuantity.jsx
  - ClearCart.jsx, SuccessPage.jsx

- **`/products`** - Product browsing:
  - AllProducts.jsx - Product grid/list
  - SingleProduct.jsx - Product detail page
  - SingleProductCard.jsx - Product card component
  - SearchProducts.jsx - Search functionality
  - Pagination.jsx - Paginated product display

- **`/reviews`** - Review system:
  - ReviewForm.jsx, SingleReview.jsx, DeleteReview.jsx

- **`/navbar`** - Navigation:
  - NavBar.jsx, Logout.jsx

- **`/userProfile`** - User account:
  - UserProfile.jsx, OrderHistoryTable.jsx

- **Authentication:**
  - Login.jsx, Register.jsx, AuthProvider.jsx

**`/src/AJAXFunctions`** - API communication layer:
- **index.js** - Axios/fetch functions for API calls
- **Constants.js** - API endpoint URLs and constants

**`/src/hooks`** - Custom React hooks:
- **useAuth.js** - Authentication state management hook

**`/src/style`** - CSS styling:
- App.css, index.css

**`/src/images`** - Image assets (cart icons, banners)

### `/public` - Static Assets
- **index.html** - Root HTML file for React SPA
- **style.css** - Global styles
- **favicon.ico** - Site icon
- Image assets (Lineup.png, Lineup2.png)

## Key Features

1. **User Authentication** - JWT-based auth with bcrypt password hashing
2. **Product Catalog** - Browse, search, and view Amiibo products with pagination
3. **Shopping Cart** - Add/remove items, update quantities
4. **Checkout** - Stripe payment integration
5. **Reviews** - Users can review products
6. **Admin Panel** - Product management (CRUD operations)
7. **User Profiles** - Order history and account management
8. **Responsive Design** - Material-UI and Bootstrap styling

## Development Workflow

- **Local Development**: `npm run start:dev` runs React dev server + Express concurrently
- **Database Setup**: `npm run db:build` initializes and seeds the database
- **Deployment**: CI/CD via GitHub Actions to Heroku with PostgreSQL addon

The application uses a proxy configuration to route API requests from React (port 3000) to Express (port 4000) during development.

# Wrapup

You'll be able to view your fullstack application by running `heroku open`. Bask in the glory of your live site, and happy coding!
