import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { login } from '../../../services/authService'
import { User } from '../../../types'

interface SignInModalProps {
  setUser: (user: User | null) => void;
  setIsSignInModalOpen: (isOpen: boolean) => void;
}

const SignInModal: React.FC<SignInModalProps> = ({
	setUser,
	setIsSignInModalOpen,
}) => {
	const handleSignIn = async (values: { email: string; password: string }) => {
		try {
			const user = await login(values.email, values.password)
			setUser(user)
			localStorage.setItem('user', JSON.stringify(user))
			setIsSignInModalOpen(false)
		} catch (error) {
			console.error('Ошибка при входе:', error)
		}
	}

	return (
		<Dialog open={true} onClose={() => setIsSignInModalOpen(false)}>
			<DialogTitle>Sign In</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={handleSignIn}
				>
					{({ submitForm }) => (
						<Form>
							<Field
								as={TextField}
								name="email"
								label="Email"
								fullWidth
								variant="outlined"
								margin="normal"
							/>
							<Field
								as={TextField}
								type="password"
								name="password"
								label="Password"
								fullWidth
								variant="outlined"
								margin="normal"
							/>
							<Button onClick={submitForm} variant="contained" color="primary">
                Login
							</Button>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	)
}

export default SignInModal
