"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = require("express");
const router = (0, express_1.Router)();
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
exports.default = router;
//# sourceMappingURL=auth.routes.js.map