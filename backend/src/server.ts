import dotenv from 'dotenv'
import cron from 'node-cron'
import app from './app'
import './db'
import fetchRSS from './services/rssService'

dotenv.config()

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

const RSS_FEED_URL = 'http://feeds.bbci.co.uk/news/world/rss.xml'
cron.schedule('*/1 * * * *', () => {
	console.log('Parsing RSS channel')
	fetchRSS(RSS_FEED_URL)
})
