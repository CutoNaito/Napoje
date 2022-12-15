import express from "express";
import sendVerificationCode from "../controllers/smtpController.js";

const router = express.Router();

router.route("/").post(sendVerificationCode);

export default router;