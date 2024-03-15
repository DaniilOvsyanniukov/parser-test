import express from 'express'
import Article from '../models/articleModel'

export const getArticles = async (req: express.Request, res: express.Response) => {
	const { page = 1, limit = 15, search = '', sort = 'publishedAt' } = req.query
  
	const pageNumber = Number(page)
	const limitNumber = Number(limit)
  
	let query = {}
	if (search) {
	  query = { $or: [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }] }
	}
  
	let sortQuery = {}
	if (sort === 'title') {
	  sortQuery = { title: 1 }
	} else if (sort === 'date') {
	  sortQuery = { publishedAt: -1 }
	}
  
	try {
	  const articles = await Article.find(query)
			.sort(sortQuery)
			.limit(limitNumber)
			.skip((pageNumber - 1) * limitNumber)
	  
	  const count = await Article.countDocuments(query)
  
	  res.json({
			articles,
			totalPages: Math.ceil(count / limitNumber),
			currentPage: page
	  })
	} catch (error) {
	  res.status(500).json({ message: 'Error fetching articles' })
	}
}
  
  

export const createArticle = async (req: express.Request, res: express.Response) => {
	const { title, content, source } = req.body
  
	if (!title || !content || !source) {
		return res.status(400).json({ message: 'All fields are required' })
	}

	try {
		const article = new Article({ title, content, source })
		await article.save()
		res.status(201).json(article)
	} catch (error) {
		res.status(500).json({ message: 'Error creating article' })
	}
}

export const getArticle = async (req: express.Request, res: express.Response) => {
	try {
		const article = await Article.findById(req.params.id)
		if (!article) {
			return res.status(404).json({ message: 'Article not found' })
		}
		res.json(article)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching article' })
	}
}


export const updateArticle = async (req: express.Request, res: express.Response) => {
	const { title, content, source } = req.body

	try {
		const article = await Article.findById(req.params.id)
		if (!article) {
			return res.status(404).json({ message: 'Article not found' })
		}

		article.title = title || article.title
		article.content = content || article.content
		article.source = source || article.source

		await article.save()
		res.json(article)
	} catch (error) {
		res.status(500).json({ message: 'Error updating article' })
	}
}

export const deleteArticle = async (req: express.Request, res: express.Response) => {
	try {
		const result = await Article.findByIdAndDelete(req.params.id)
		if (!result) {
			return res.status(404).json({ message: 'Article not found' })
		}
		res.json({ message: 'Article deleted' })
	} catch (error) {
		res.status(500).json({ message: 'Error deleting article' })
	}
}
