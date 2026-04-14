import "reflect-metadata";
import "dotenv/config";
import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../swagger.json";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

RegisterRoutes(app);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
}).on("error", (err: Error) => {
  console.error(`Server error: ${err.message}`);
  process.exit(1);
});
