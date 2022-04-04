const express = require("express");
const User = require("../model/userSchema");
const Otp = require("../model/otpSchema");

const dotenv = require("dotenv");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const emaillogo = "./instagram.png";
const sgmail = require("@sendgrid/mail");
const router = express.Router();
dotenv.config();
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  const finduser = await User.findOne({ email: email });

  if (!finduser) {
    return res.json({ status: 404, error: "user does not exist" });
  }

  let otpcode = Math.floor(Math.random() * 10000 + 1);
  const newotp = await new Otp({
    email: email,
    otp: otpcode,
    expirein: new Date().getTime() + 300 * 1000,
  });
  newotp.save();
  const apikey = process.env.SGPASSWORD;
  sgmail.setApiKey(apikey);
  var message = {
    from: "sourabhvaish6@gmail.com",
    to: email,
    subject: "reset password otp",
    text: "your otp is",
    html: `<html lang="en-US">
  
    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Reset Password Email Template</title>
        <meta name="description" content="Reset Password Email Template.">
        <style type="text/css">
            a:hover {text-decoration: underline !important;}
        </style>
    </head>
    
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                     
                              </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                requested to reset your password</h1>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            Please use the verification code below on the Arengu website:
                                            </p>
                                            <p
                                                style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">${newotp.otp}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                           
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    
    </html>`,
    // attachments: [{ filename: "text.txt", path: "./text.txt" }],
  }; // details of to send from, to,  subject, text(message),

  await sgmail
    .send(message)
    .then((res) => {
      console.log("emailsend");
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).json({ email: newotp.email, expirein: newotp.expirein });
});

module.exports = router;
