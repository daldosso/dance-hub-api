"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const events_routes_1 = __importDefault(require("./routes/events.routes"));
const venues_routes_1 = __importDefault(require("./routes/venues.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", users_routes_1.default);
app.use("/api/events", events_routes_1.default);
app.use("/api/venues", venues_routes_1.default);
// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Dance-Hub API is running",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
    });
});
app.listen(port, () => {
    console.log(`🚀 Dance-Hub API avviata su http://localhost:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
// Graceful shutdown
process.on("SIGINT", async () => {
    await prisma.$disconnect();
    console.log("Prisma disconnected. Server stopped.");
    process.exit(0);
});
//# sourceMappingURL=index.js.map