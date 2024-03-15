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
const rss_parser_1 = __importDefault(require("rss-parser"));
const articleModel_1 = __importDefault(require("../models/articleModel"));
const parser = new rss_parser_1.default();
const fetchRSS = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feed = yield parser.parseURL(url);
        feed.items.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const doesExist = yield articleModel_1.default.findOne({ title: item.title });
                if (!doesExist) {
                    const article = new articleModel_1.default({
                        title: item.title,
                        content: item.content || 'No content',
                        source: item.link,
                        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
                    });
                    yield article.save();
                    console.log(`Article saved: ${item.title}`);
                }
            }
            catch (error) {
                console.error(`Error saving article: ${error.message}`);
            }
        }));
    }
    catch (error) {
        console.error(`Error fetching RSS feed: ${error.message}`);
    }
});
exports.default = fetchRSS;
