import React, { useState, useEffect } from 'react'
import { deleteArticle, fetchArticles } from '../../services/articleService'
import ArticleItem from './ArticleItem'
import { Article, User } from '../../types'
import { Box, Button, Pagination, Typography } from '@mui/material'
import EditArticleModal from '../modals/UpdateArticleModal'
import CreateArticleModal from '../modals/CreateArticleModal'
import FilterSort from './FilterSort'

interface ArticleListProps {
  user: User | null;
}

const ArticleList: React.FC<ArticleListProps> = ({ user }) => {
	const [articles, setArticles] = useState<Article[]>([])
	const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
	const [isCreateArticleModalOpen, setIsCreateArticleModalOpen] = useState<boolean>(false)
	const [isEditArticleModalOpen, setIsEditArticleModalOpen] = useState<boolean>(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [noArticles, setNoArticles] = useState<boolean>(false)

	useEffect(() => {
		loadArticles()
	}, [currentPage])

	const loadArticles = async (search = '', sort = '') => {
		setIsLoading(true)
		try {
			const {articles, totalPages} = await fetchArticles(currentPage, 15, search, sort)
			console.log(articles)
			setArticles(articles)
			setTotalPages(totalPages)
			setNoArticles(articles && articles.length === 0)
		} catch (error) {
			console.error('Error fetching articles:', error)
			setNoArticles(true)
		}
		setIsLoading(false)
	}

	const handleEdit = (article: Article) => {
		setSelectedArticle(article)
		setIsEditArticleModalOpen(true)
	}

	const handleDelete = async (article: Article) => {
		if (article._id) {
			await deleteArticle(article._id)
			await loadArticles()
		} else {
			console.error('Error: Article ID is missing')
		}
	}

	const handleArticleUpdated = async () => {
		await loadArticles()
	}

	const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page)
	  }

	const handleApplyFilterSort = (search: string, sort: string) => {
		loadArticles(search, sort)
	}  

	return (
		<Box sx={{ padding: '20px'}}>
			<FilterSort onApply={handleApplyFilterSort} />
			{user && user.role === 'admin' && (
				<Button onClick={() => setIsCreateArticleModalOpen(true)}>Create Article</Button>
			)}
			{isLoading ? (
				<Typography>Loading...</Typography>
			) : noArticles ? (
				<Typography>No articles found.</Typography>
			) : (
				<Box>
					{articles.map((article) => (
						<ArticleItem
							key={article._id}
							article={article}
							user={user}
							onEdit={() => handleEdit(article)}
							onDelete={() => handleDelete(article)}
						/>
					))}
					<Pagination count={totalPages} page={currentPage} onChange={handlePageChange} sx={{padding: '20px'}}/>
				</Box>
			)}
			{isEditArticleModalOpen && selectedArticle && (
				<EditArticleModal
					article={selectedArticle}
					setIsEditArticleModalOpen={setIsEditArticleModalOpen}
					onArticleUpdated={handleArticleUpdated}
				/>
			)}
			{isCreateArticleModalOpen && (
				<CreateArticleModal
				    setIsCreateArticleModalOpen={setIsCreateArticleModalOpen}
					onArticleCreated={handleArticleUpdated}
				/>
			)}
		</Box>
	)
}

export default ArticleList
