import express, { Request, Response } from "express";
import User from "../model/User";
import ErrorMsg from "../enum/ErrorMsg";
import SuccessMsg from "../enum/SuccessMsg";
import UserVO from "../vo/UserVO";
import jwt from "jsonwebtoken";
import env from "../lib/env";
import transporter from "../lib/transporter";
import crypto from "crypto";
import { createOrUpdateUser } from "../business/UserController";
import { ResetPasswordRequest, UserModel } from "../lib/types";
const auth = require("../middleware/auth");
const hash = crypto.createHmac("sha256", env.SECRET_CRYPTO);
const userController = express.Router();

userController.get("/recover_password", async (req: Request, res: Response) => {
  try {
    const email = req.query.email.toString();
    const user = await User.findOne({
      where: { email: email },
    });
    if (user !== null) {
      const temporaryPass = hash.update(user.email + user.pass).digest("hex");
      user.temporaryPass = temporaryPass;
      await user.save();
      const link = `<a href="${
        env.CLIENT_URL +
        "/user/recover_password?" +
        "temporaryPass=" +
        temporaryPass
      }  target="_blank">Restaura tu contraseña</a>`;
      const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: user.email,
        subject: "Recupera tu contraseña (TEST)",
        html: "<p>Recupera tu contraseña clickea el link siguiente: </p>" + link,
      };
      let mailInfo = await transporter.sendMail(mailOptions, () =>
        console.log(mailInfo)
      );

      return res
        .status(200)
        .json({ code: 200, message: SuccessMsg.EMAIL_SENT });
    }
    return res
      .status(500)
      .json({ code: 500, message: "Usuario no encontrado" });
  } catch (error: any) {
    return res.status(500).json({
      code: 500,
      message: ErrorMsg.USER_RESTORE_PASS,
      error: error.message,
    });
  }
});

userController.get("/me", auth, async (req: Request, res: Response) => {
  try {
    const currentUser = req["user_token"];
    const userDB = await User.findOne({
      where: { email: currentUser.email.toString() },
    });
    return res.status(200).json(userDB);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: ErrorMsg.USER_FECTHED,
    });
  }
});

userController.post("/", auth, async (req: Request, res: Response) => {
  try {
    const user = req.body as UserModel;
    createOrUpdateUser(user, res);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Algo salió mal al obtener información personal",
    });
  }
});

userController.post(
  "/recover_password",
  async (req: Request, res: Response) => {
    try {
      const resetBody = req.body as ResetPasswordRequest;
      if (resetBody.password !== resetBody.confirmPassword) {
        return res.status(500).json({
          code: 500,
          message:
            "La contraseña y la confirmación de la contraseña no es la misma",
        });
      }
      const user = await User.findOne({
        where: {
          email: resetBody.email,
          temporaryPass: resetBody.temporaryPass,
        },
      });
      if (user != null) {
        user.pass = resetBody.password;
        await user.save();
        return res.status(200).json({ code: 200, message: "Password updated" });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "Algo salió mal al resetear la contraseña",
      });
    }
  }
);

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
          id: user.id,
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
