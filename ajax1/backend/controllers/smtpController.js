import client from "../config/smtpconfig.js";

async function sendVerificationCode(req, res, next){
    try{
        await client.connect();
        await client.greet({hostname: process.env.SMTP_HOST});
        await client.authPlain({username: process.env.SMTP_USERNAME, password: process.env.SMTP_PASSWORD});
        await client.mail({from: process.env.SMTP_USERNAME});
        await client.rcpt({to: req.body.email});
        await client.data(`Subject: Verification code\n\nYour verification code is: ${req.body.code}`);
        await client.quit();

        res.status(200).json({ message: "Verification code sent!" });
    } catch(error){
        console.log(error);
    }
};

export default sendVerificationCode;