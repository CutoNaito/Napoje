import "dotenv/config";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import smtpRoutes from "./routes/smtpRoutes.js";
import verificationRoutes from "./routes/verificationRoutes.js";
import drinksRoutes from "./routes/drinksRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/smtp", smtpRoutes);
app.use("/api/verification", verificationRoutes);
app.use("/api/drinks", drinksRoutes);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});