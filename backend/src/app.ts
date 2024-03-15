import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import articleRoutes from './routes/articleRoutes'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/auth', authRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/users', userRoutes)

app.use((err: Error, req: express.Request, res: express.Response) => {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

export default app
