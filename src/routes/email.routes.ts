import express from 'express';
import { Response, Request } from 'express';
import nodemailer from "nodemailer";

const route = express.Router();

route.post('/send', async (req: Request, res: Response) => {
  const output = `
    <h3>Message for ${req.body.name}</h3>
    <p>you have a new message</p>
    <p>${req.body.message}</p>
  `
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log(process.env.EMAIL, req.body.email);

    await transporter.sendMail({
      from: `J Carlos Mamani <${process.env.EMAIL}>`,
      to: req.body.email,  // list of emails
      subject: "This is a test sender emails",
      html: output
    });

    res.render("contact", { layout: false })
  } catch (err) {
    console.log(err);
    res.render("contact", { layout: false })
  }
})

export default route;