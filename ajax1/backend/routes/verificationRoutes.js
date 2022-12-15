import express from "express";
import verificationController from "../controllers/verificationController.js";

const router = express.Router();

router.route("/").get(verificationController.getAllVerifications).post(verificationController.createVerification);
router.route("/:email").get(verificationController.getVerification).delete(verificationController.deleteVerification);
router.route("/code/:code").get(verificationController.getVerificationByCode);

export default router;