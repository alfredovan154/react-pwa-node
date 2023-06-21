import { Request, Response } from "express";
import User from "../model/User";
import { UserModel } from "../lib/types";
import SuccessMsg from "../enum/SuccessMsg";
import ErrorMsg from "../enum/ErrorMsg";

export const createOrUpdateUser = async (user: UserModel, res: Response) => {
  const userDB = await User.findOne({
    where: { id: user.id },
  });
  if (userDB != null) {
    userDB.firstName = user.firstName;
    userDB.lastName = user.lastName;
    userDB.fullName = `${user.firstName} ${user.lastName}`;
    if (userDB.email != user.email) {
      const emails = await User.findAll({ where: { email: user.email } });
      if (emails.length > 1) {
        return res.status(500).json({ message: ErrorMsg.USER_REPEATED_EMAIL });
      }
      userDB.email = user.email;
    }
    await userDB.save();
    return res.status(200).json({ message: SuccessMsg.USER_UPDATED });
  } else {
    await User.create(user);
    return res.status(200).json({ message: SuccessMsg.USER_CREATED });
  }
};
