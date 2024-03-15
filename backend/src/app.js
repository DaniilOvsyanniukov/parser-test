"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/articles', articleRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
exports.default = app;
