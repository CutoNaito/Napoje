import "dotenv/config";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import smtpRoutes from "./routes/smtpRoutes.js";
import verificationRoutes from "./routes/verificationRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/smtp", smtpRoutes);
app.use("/api/verification", verificationRoutes);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});