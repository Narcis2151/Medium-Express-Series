import createServer from "./server";
import { setupSwaggerDocs } from "./swagger";

const app = createServer();

setupSwaggerDocs(app);

app.listen(3000, () => {
  console.log("App is running!");
});
