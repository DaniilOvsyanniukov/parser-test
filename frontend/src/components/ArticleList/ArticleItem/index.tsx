import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Article, User } from '../../../types'

interface ArticleItemProps {
  article: Article;
  user: User | null;
  onEdit: (article: Article) => void
  onDelete: (article: Article) => void
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article, user, onEdit, onDelete }) => {
	return (
		<Card>
			<CardContent>
				<Typography variant="h5">{article.title}</Typography>
				<Typography variant="body1">{article.content}</Typography>
				<Typography variant="body2">Source: {article.source}</Typography>
				{user && user.role === 'admin' && (
					<Box>
						<Button onClick={()=>onEdit(article)}>Edit</Button>
						<Button onClick={()=>onDelete(article)}>Delete</Button>
					</Box>
					

				)}
			</CardContent>
		</Card>
	)
}

export default ArticleItem
