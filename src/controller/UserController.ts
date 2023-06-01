import express, { Request, Response } from "express";
import User from "../model/User";
import ErrorMsg from "../enum/ErrorMsg";
import UserVO from "../vo/UserVO";
import jwt from "jsonwebtoken";
import { token } from "morgan";
const userController = express.Router();

userController.post("/login", async (req: Request, res: Response) => {
  try {
    const body = req.body as UserVO;
    const user = await User.findOne({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (user != null) {
      const token = jwt.sign(
        {
          email: user.email,
          password: user.password,
        },
        "debugkey"
      );

      return res
        .status(200)
        .json({ accessToken: token, message: ErrorMsg.USER_NOT_FOUND });
    } else {
      return res.status(404).json({ message: ErrorMsg.USER_NOT_FOUND });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: ErrorMsg.STUDENT_REGISTERED, error: error });
  }
});

export default userController;
