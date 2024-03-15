"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const articleSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    source: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
});
const Article = mongoose_1.default.model('Article', articleSchema);
exports.default = Article;
