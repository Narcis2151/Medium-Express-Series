import express from "express";

import articlesRouter from "./modules/articles/articles.routes";
import authenticationRoutes from "./modules/authentication/authentication.routes";
import authorizationRoutes from "./modules/authorization/authorization.routes";

const app = express();

app.use(express.json());

app.get("/healthcheck", (_req, res) => {
  res.send("API is up and running!");
});

app.use("/authentication", authenticationRoutes);
app.use("/authorization", authorizationRoutes);
app.use("/articles", articlesRouter);

app.listen(3000, () => {
  console.log("App is running!");
});
