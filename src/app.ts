import createServer from "./server";
import { setupSwaggerDocs } from "./swagger";

const app = createServer();

setupSwaggerDocs(app);

app.listen(3000, "0.0.0.0", () => {
  console.log("App is running!");
});
