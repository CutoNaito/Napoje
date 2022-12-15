import { SMTPClient } from "smtp-client";
import "dotenv/config"

const client = new SMTPClient({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT
});

export default client;