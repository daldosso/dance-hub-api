"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json({ message: "Lista eventi - da implementare" });
});
router.get("/:id", (req, res) => {
    res.json({ message: `Evento con id ${req.params.id} - da implementare` });
});
exports.default = router;
//# sourceMappingURL=events.routes.js.map