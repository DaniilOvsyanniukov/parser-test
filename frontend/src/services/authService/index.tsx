import axios from 'axios'
import { User } from '../../types'

const API_URL = `${process.env.REACT_APP_API_URL}/auth`

export const login = async (email: string, password: string): Promise<User> => {
	const response = await axios.post(`${API_URL}/login`, { email, password })
	return response.data
}

export const register = async (name: string, email: string, password: string): Promise<User> => {
	const response = await axios.post(`${API_URL}/register`, { name, email, password })
	return response.data
}
