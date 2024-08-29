import express from "express";
import passport from 'passport';

import articlesRouter from "./modules/articles/articles.routes";
import googleAuthRouter from './modules/authentication/googleAuth.routes';
import authenticationRoutes from "./modules/authentication/authentication.routes";
import authorizationRoutes from "./modules/authorization/authorization.routes";
import './modules/authentication/passport'; // Import the Passport configuration

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get("/healthcheck", (_req, res) => {
  res.send("API is up and running!");
});

app.use("/authentication", authenticationRoutes);
app.use('/authentication', googleAuthRouter);
app.use("/authorization", authorizationRoutes);
app.use("/articles", articlesRouter);

app.listen(3000, () => {
  console.log("App is running!");
});

