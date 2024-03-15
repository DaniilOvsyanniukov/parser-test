import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { User } from '../../types' 
import SignUpModal from '../modals/SignUpModal'
import SignInModal from '../modals/SignInModal'

interface HeaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Header: React.FC<HeaderProps> = ({ user, setUser }) => {
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false)
	const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false)
	const handleLogout = () => {
		localStorage.removeItem('user')
		setUser(null)
	}

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" style={{ flexGrow: 1 }}>
          News
				</Typography>
				{user ? (
					<>
						<Typography variant="subtitle1" style={{ marginRight: 20 }}>
              Hello, {user.name}!
						</Typography>
						<Button color="inherit" onClick={handleLogout}>Exit</Button>
					</>
				) : (
					<>
						<Button color="inherit" onClick={() => setIsSignUpModalOpen(true)}>Sign Up</Button>
						<Button color="inherit" onClick={() => setIsSignInModalOpen(true)}>Sign In</Button>
					</>
				)}
			</Toolbar>
			{isSignUpModalOpen?<SignUpModal setUser={setUser} setIsSignUpModalOpen={setIsSignUpModalOpen}/>: null}
			{isSignInModalOpen?<SignInModal setUser={setUser} setIsSignInModalOpen={setIsSignInModalOpen}/>: null}
		</AppBar>
	)
}

export default Header
