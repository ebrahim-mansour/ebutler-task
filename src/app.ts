import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./common/errors/not-found-error";

const app = express();
app.use(cors());
app.use(json());

// Here you init you APIs

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
