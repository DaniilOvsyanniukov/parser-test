"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const app_1 = __importDefault(require("./app"));
require("./db");
const rssService_1 = __importDefault(require("./services/rssService"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const RSS_FEED_URL = 'http://feeds.bbci.co.uk/news/world/rss.xml';
node_cron_1.default.schedule('*/1 * * * *', () => {
    console.log('Parsing RSS channel');
    (0, rssService_1.default)(RSS_FEED_URL);
});
