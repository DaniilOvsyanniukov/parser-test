"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.getArticle = exports.createArticle = exports.getArticles = void 0;
const articleModel_1 = __importDefault(require("../models/articleModel"));
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 15, search = '', sort = 'publishedAt' } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    let query = {};
    if (search) {
        query = { $or: [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }] };
    }
    let sortQuery = {};
    if (sort === 'title') {
        sortQuery = { title: 1 };
    }
    else if (sort === 'date') {
        sortQuery = { publishedAt: -1 };
    }
    try {
        const articles = yield articleModel_1.default.find(query)
            .sort(sortQuery)
            .limit(limitNumber)
            .skip((pageNumber - 1) * limitNumber);
        const count = yield articleModel_1.default.countDocuments(query);
        res.json({
            articles,
            totalPages: Math.ceil(count / limitNumber),
            currentPage: page
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching articles' });
    }
});
exports.getArticles = getArticles;
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, source } = req.body;
    if (!title || !content || !source) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const article = new articleModel_1.default({ title, content, source });
        yield article.save();
        res.status(201).json(article);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating article' });
    }
});
exports.createArticle = createArticle;
const getArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield articleModel_1.default.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching article' });
    }
});
exports.getArticle = getArticle;
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, source } = req.body;
    try {
        const article = yield articleModel_1.default.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        article.title = title || article.title;
        article.content = content || article.content;
        article.source = source || article.source;
        yield article.save();
        res.json(article);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating article' });
    }
});
exports.updateArticle = updateArticle;
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield articleModel_1.default.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json({ message: 'Article deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting article' });
    }
});
exports.deleteArticle = deleteArticle;
