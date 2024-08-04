import express from "express";

const app = express();

app.use(express.json());

app.get("/healthcheck", (_req, res) => {
  res.send("API is up and running!");
});

app.listen(3000, () => {
  console.log("App is running!");
});