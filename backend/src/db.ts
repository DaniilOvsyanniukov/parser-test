import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

if (!process.env.MONGODB_URI) {
	console.error('FATAL ERROR: MONGODB_URI is not defined.')
	process.exit(1)
}
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
	console.log('We\'re connected to MongoDB!')
})
