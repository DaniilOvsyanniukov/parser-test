import React from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import { createArticle } from '../../../services/articleService'
import { Article } from '../../../types'

interface CreateArticleModalProps {
  setIsCreateArticleModalOpen: (isOpen: boolean) => void;
  onArticleCreated: () => void;
}

const CreateArticleModal: React.FC<CreateArticleModalProps> = ({ setIsCreateArticleModalOpen, onArticleCreated }) => {
	
	const handleSubmit = async (values: Article) => {
		await createArticle(values)
		onArticleCreated()
		setIsCreateArticleModalOpen(false)
	}

	return (
		<Dialog open={true} onClose={()=> setIsCreateArticleModalOpen(false)}>
			<DialogTitle>Create Article</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={{ title: '', content: '', source: '' }}
					onSubmit={handleSubmit}
				>
					{({ submitForm }) => (
						<Form>
							<Field
								as={TextField}
								name="title"
								label="Title"
								fullWidth
								variant="outlined"
								margin="normal"
							/>
							<Field
								as={TextField}
								name="content"
								label="Content"
								fullWidth
								multiline
								rows={4}
								variant="outlined"
								margin="normal"
							/>
							<Field
								as={TextField}
								name="source"
								label="Source"
								fullWidth
								variant="outlined"
								margin="normal"
							/>
							<Button onClick={submitForm} color="primary">
								Create
							</Button>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	)
}


export default CreateArticleModal
