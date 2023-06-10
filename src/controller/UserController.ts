import express, { Request, Response } from "express";
import User from "../model/User";
import ErrorMsg from "../enum/ErrorMsg";
import SuccessMsg from "../enum/SuccessMsg";
import UserVO from "../vo/UserVO";
import jwt from "jsonwebtoken";
import env from "../lib/env";
const userController = express.Router();

userController.post("/login", async (req: Request, res: Response) => {
  try {
    const body = req.body as UserVO;
    const user = await User.findOne({
      where: {
        email: body.email,
      },
    });
    if (user != null) {
      const token = jwt.sign(
        {
          email: user.email,
          password: user.pass,
        },
        env.SECRET_KEY
      );
      return res
        .status(200)
        .json({ accessToken: token, message: SuccessMsg.LOGIN_USER });
    } else {
      return res.status(500).json({ message: ErrorMsg.USER_NOT_FOUND });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: ErrorMsg.USER_LOGIN_ERROR, error: error.message });
  }
});

export default userController;
