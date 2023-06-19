import Nodemailer from "nodemailer";
import env from "./env";

const transporter = Nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.EMAIL_USERNAME,
    pass: env.EMAIL_PASS,
  },
});

export default transporter;
