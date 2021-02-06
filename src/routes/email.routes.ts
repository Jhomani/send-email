import express from 'express';
import { Response, Request } from 'express';
import nodemailer from "nodemailer";
import { google } from "googleapis";

const route = express.Router();

route.post('/send', async (req: Request, res: Response) => {
  const output = `
    <h3>Message for ${req.body.name}</h3>
    <p>you have a new message</p>
    <p>${req.body.message}</p>
  `

  const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  try {
    const accessToken: any = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "juancarlos69528125@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      },
    });

    console.log(process.env.EMAIL, req.body.email);

    await transporter.sendMail({
      from: `WITH GOOGLE TOKEN <${process.env.EMAIL}>`,
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