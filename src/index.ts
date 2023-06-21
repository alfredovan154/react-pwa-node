import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userController from "./controller/UserController";
import productController from "./controller/ProductController";
import visitorController from "./controller/VisitorController";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.set('view engine', 'hbs');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(loggerMiddleware);
app.use(morgan('common'));
app.use("/user", userController);
app.use("/product", productController);
app.use("/visitor", visitorController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

});
