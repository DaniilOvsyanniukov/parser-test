import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import ArticleList from '../../components/ArticleList'
import { User } from '../../types' 
import { getUserById } from '../../services/userService'

const HomePage: React.FC = () => {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const initUser = async () => {
			const storedUserData = localStorage.getItem('user')
			if (storedUserData) {
				const { id, token } = JSON.parse(storedUserData)

				try {
					const freshUserData = await getUserById(id)
					if (freshUserData) {
						setUser({ ...freshUserData, token })
					}
				} catch (error) {
					console.error('Error fetching user data:', error)
				}
			}
		}

		initUser()
	}, [])

	return (
		<div>
			<Header user={user} setUser={setUser} />
			<ArticleList user={user} />
		</div>
	)
}

export default HomePage
