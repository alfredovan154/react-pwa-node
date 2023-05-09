import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import studentController from "./controller/StudentController";
import morgan from "morgan";
import { loggerMiddleware } from "./middleware/logger";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(loggerMiddleware);
app.use(morgan('common'));
app.use("/students", studentController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
