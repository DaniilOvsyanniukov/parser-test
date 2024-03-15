import React from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material'
import { Formik, Form } from 'formik'
import { updateArticle } from '../../../services/articleService'
import { Article } from '../../../types'

interface EditArticleModalProps {
  article: Article;
  setIsEditArticleModalOpen: (isOpen: boolean) => void;
  onArticleUpdated: () => void;
}

const EditArticleModal: React.FC<EditArticleModalProps> = ({ article, setIsEditArticleModalOpen, onArticleUpdated }) => {
	const handleSubmit = async (values: Article) => {
		if (!article._id) {
			console.error('Article ID is missing')
			return
		}
		await updateArticle(article._id, values)
		onArticleUpdated()
		setIsEditArticleModalOpen(false)
	}

	return (
		<Dialog open={true} onClose={() => setIsEditArticleModalOpen(false)}>
			<DialogTitle>Edit Article</DialogTitle>
			<DialogContent>
				<Formik initialValues={article} onSubmit={handleSubmit}>
					{({ handleChange, handleSubmit }) => (
						<Form onSubmit={handleSubmit}>
							<TextField
								name="title"
								label="Title"
								fullWidth
								variant="outlined"
								margin="normal"
								onChange={handleChange}
								defaultValue={article.title}
							/>
							<TextField
								name="content"
								label="Content"
								fullWidth
								multiline
								rows={4}
								variant="outlined"
								margin="normal"
								onChange={handleChange}
								defaultValue={article.content}
							/>
							<TextField
								name="source"
								label="Source"
								fullWidth
								variant="outlined"
								margin="normal"
								onChange={handleChange}
								defaultValue={article.source}
							/>
							<Button type="submit" color="primary">
                Update
							</Button>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	)
}

export default EditArticleModal
