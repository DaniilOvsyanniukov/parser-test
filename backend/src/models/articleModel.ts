import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	source: { type: String, required: true },
	publishedAt: { type: Date, default: Date.now },
})

const Article = mongoose.model('Article', articleSchema)

export default Article
