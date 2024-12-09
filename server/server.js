const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
// const { createProxyMiddleware } = require("http-proxy-middleware");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = 3099;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3027", // Adjust to frontend URL later
    methods: 'GET,POST',
    credentials: true,
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Serve static files from /assets
  app.use('/assets', express.static(path.join(__dirname, 'assets')));

  // Optional proxy middleware (if images are hosted externally)
  // Comment out if images are hosted on this server

  // app.use(
  //   '/assets/images',
  //   createProxyMiddleware({
  //     target: 'http://localhost:3099',
  //     changeOrigin: true,
  //     pathRewrite: { '^/assets/images': '/assets/images' },
  //   })
  // );

  app.use('/assets', (req, res, next) => {
    console.log(`Static file request: ${req.path}`);
    next();
  });
  

  // Serve frontend in production
  // if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  // }
  

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
