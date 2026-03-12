import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { upload } from "../services/upload.service";
import { uploadProfilePhoto } from "../controllers/user.controller";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Lista utenti - da implementare" });
});

router.post(
  "/profile-photo",
  authenticateToken,
  upload.single("profilePhoto"), // nome del campo nel form-data
  uploadProfilePhoto,
);

export default router;
