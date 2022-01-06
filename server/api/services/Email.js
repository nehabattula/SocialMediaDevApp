import nodemailer from 'nodemailer';
export const sendEmail = async (toUser) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'huskydevportal@gmail.com',
      pass: 'Husky@123',
    },
  });
  transporter.verify().then().catch(console.error);
  transporter.sendMail({
    from: '"Husky Developers Portal" <huskydevportal@gmail.com>',
    to: toUser,
    subject: "Registered Successfully ",
    text: "mailBody",
    html: "<b>You have successfully registered on the Husky Developers Portal</b>",
  }).then(info => {
  }).catch(console.error);
}


