"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const products_1 = __importDefault(require("./routes/products"));
const router = (0, express_1.default)();
router.use((0, morgan_1.default)("dev"));
router.use(express_1.default.urlencoded({ extended: false }));
router.use(express_1.default.json());
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With,Content-Type,Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
        return res.status(200).json({});
    }
    next();
});
router.use(products_1.default);
router.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({
        message: error.message,
    });
});
const httpServer = http_1.default.createServer(router);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8067;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));