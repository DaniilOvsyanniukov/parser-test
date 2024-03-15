import Parser from 'rss-parser';
import Article from '../models/articleModel';

const parser = new Parser();

const fetchRSS = async (url: string) => {
  try {
    const feed = await parser.parseURL(url);
    feed.items.forEach(async (item) => {
      try {
        const doesExist = await Article.findOne({ title: item.title });
        if (!doesExist) {
          const article = new Article({
            title: item.title,
            content: item.content || 'No content',
            source: item.link,
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          });
          await article.save();
          console.log(`Article saved: ${item.title}`);
        }
      } catch (error: unknown) {
        console.error(`Error saving article: ${(error as Error).message}`);
      }
    });
  } catch (error: unknown) {
    console.error(`Error fetching RSS feed: ${(error as Error).message}`);
  }
};

export default fetchRSS;

