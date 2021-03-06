import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import cors from 'cors'
import usersRouter from './routes/users.js'
import transactionsRouter from './routes/transactions.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log('App running on port', PORT)
})
//Users route (currently not being used)
app.use('/users', usersRouter)
//Transactions route
app.use('/transactions', transactionsRouter)

// To connect to atlas mongoDB
const MONGO_URL = process.env.MONGO_URL

const createConnection = async () => {
	const client = new MongoClient(MONGO_URL)
	await client.connect()
	console.log('Mongo connected')
	return client
}

//Creating a new connection to mongodb
export const client = await createConnection()

//Initial check up
app.get('/', function (req, res) {
	res.send('App is up and running!!')
})
