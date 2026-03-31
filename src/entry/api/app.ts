import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "./routes";

export const app = express();

(async () => {
  app.use(
    urlencoded({
      extended: true,
    })
  );
  app.use(json());

  const port = 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('connection', (socket) => {
    const TIMEOUT_MINUTES = 10;
    socket.setTimeout(TIMEOUT_MINUTES * 60 * 1000);
    socket.on('timeout', () => {
      console.warn('A socket timed out and is being destroyed.');
      socket.destroy();
    });
  }).on('error', (err: any) => {
    console.error(`Error occurred while starting the server: ${err.message}`);
    process.exit(1);
  });

})();

RegisterRoutes(app);
