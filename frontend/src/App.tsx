import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import HomePage from './pages/HomePage'

const App: React.FC = () => {
  

	return (
		<ThemeProvider theme={createTheme()}>
			<CssBaseline />
			<HomePage />
		</ThemeProvider>
	)
}

export default App
