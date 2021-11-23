import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./common/errors/not-found-error";
import router from "./routes/index.routes";

const app = express();
app.use(cors());
app.use(json());

app.use('/api', router)

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
