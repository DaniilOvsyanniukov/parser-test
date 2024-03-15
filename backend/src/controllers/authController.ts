import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/userModel'
import jwt from 'jsonwebtoken'

export const register = async (req: express.Request, res: express.Response) => {
	const { name, email, password } = req.body

	if (!name || !email || !password) {
		return res.status(400).json({ message: 'All fields are required' })
	}

	try {
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' })
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = new User({ name, email, password: hashedPassword })
		await newUser.save()

		if (!process.env.JWT_SECRET) {
			console.error('FATAL ERROR: JWT_SECRET is not defined.')
			process.exit(1) 
		}

		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

		res.status(201).json({
			id: newUser._id,
			name: newUser.name,
			role: newUser.role,
			token,
		})
	} catch (error) {
		res.status(500).json({ message: 'Error creating user' })
	}
}


export const login = async (req: express.Request, res: express.Response) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({ message: 'All fields are required' })
	}

	try {
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({ message: 'User does not exist' })
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' })
		}

		if (!process.env.JWT_SECRET) {
			console.error('FATAL ERROR: JWT_SECRET is not defined.')
			process.exit(1) 
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

		res.json({
			id: user._id,
			name: user.name,
			role: user.role,
			token,
		})
	} catch (error) {
		res.status(500).json({ message: 'Error logging in user' })
	}
}

export const getUserById = async (req: express.Request, res: express.Response) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.json({
			id: user._id,
			name: user.name,
			role: user.role,
		})
	} catch (error) {
		res.status(500).json({ message: 'Error fetching user' })
	}
}

