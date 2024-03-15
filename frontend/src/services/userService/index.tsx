import axios from 'axios'
import { User } from '../../types'

const API_URL = `${process.env.REACT_APP_API_URL}/users`

export const getUserById = async (userId: string): Promise<User> => {
	const response = await axios.get(`${API_URL}/${userId}`)
	return response.data
}
