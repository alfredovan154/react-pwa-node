import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userController from "./controller/UserController";

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
app.use("/user", userController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

});
