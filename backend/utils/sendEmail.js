const nodeMailer = require('nodemailer');

const sendEmail = async(options) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        // service: process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
          },
    })

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to: options.email,
        subject:options.subject,
        text: options.message,
    }
    
    // console.log(mailOptions);
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;