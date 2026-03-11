// src/routes/auth.routes.ts
import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
  res
    .status(501)
    .json({ message: "Endpoint register non ancora implementato" });
});

router.post("/login", (req, res) => {
  res.status(501).json({ message: "Endpoint login non ancora implementato" });
});

router.get("/me", (req, res) => {
  res
    .status(501)
    .json({ message: "Endpoint profilo utente non ancora implementato" });
});

export default router;
