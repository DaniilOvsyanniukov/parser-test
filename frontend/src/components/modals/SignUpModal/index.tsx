import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { register } from '../../../services/authService'
import { User } from '../../../types'

interface SignUpModalProps {
  setUser: (user: User | null) => void;
  setIsSignUpModalOpen: (isOpen: boolean) => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
	setUser,
	setIsSignUpModalOpen,
}) => {
	const handleSignUp = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
		try {
			const user = await register(values.name, values.email, values.password)
			setUser(user)
			localStorage.setItem('user', JSON.stringify(user))
			setIsSignUpModalOpen(false)
		} catch (error) {
			console.error('Ошибка при регистрации:', error)
		}
	}

	return (
		<Dialog open={true} onClose={() => setIsSignUpModalOpen(false)}>
			<DialogTitle>Sign Up</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={{ name: '', email: '', password: '' }}
					onSubmit={handleSignUp}
				>
					{({ submitForm }) => (
						<Form>
							<Field
								name="name"
								as={TextField}
								label="Name"
								fullWidth
								variant="outlined"
								margin="normal"
							/>
							<Field
								name="email"
								as={TextField}
								type="email"
								label="Email"
								fullWidth
								variant="outlined"
								margin="normal"
							/>
							<Field
								name="password"
								as={TextField}
								type="password"
								label="Password"
								fullWidth
								variant="outlined"
								margin="normal"
							/>
							<Button onClick={submitForm} variant="contained" color="primary">
                Register
							</Button>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	)
}

export default SignUpModal
