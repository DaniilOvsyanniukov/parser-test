import axios from 'axios'
import { Article, ArticlesResponse } from '../../types'

const API_URL = `${process.env.REACT_APP_API_URL}/articles`

export const fetchArticles = async (page: number = 1, limit: number = 15, search: string = '', sort: string = 'publishedAt'): Promise<ArticlesResponse> => {
	const response = await axios.get(API_URL, {
	  params: {
			page,
			limit,
			search,
			sort,
	  },
	})
	return response.data
}

export const updateArticle = async (id: string, articleData: Article): Promise<Article> => {
	const response = await axios.put(`${API_URL}/${id}`, articleData)
	return response.data
}

export const deleteArticle = async (id: string): Promise<void> => {
	await axios.delete(`${API_URL}/${id}`)
}

export const createArticle = async (articleData: Article): Promise<Article> => {
	const response = await axios.post(API_URL, articleData)
	return response.data
}
