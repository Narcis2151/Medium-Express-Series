import createServer from "./server";

const app = createServer();

app.listen(3000, () => {
  console.log("App is running!");
});
