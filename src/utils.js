import { client } from './index.js'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'

//Utility functions

async function hashPassword(password) {
	const numberOfRounds = 10
	const salt = await bcrypt.genSalt(numberOfRounds)
	const HashedPassword = await bcrypt.hash(password, salt)
	return HashedPassword
}

async function addUser(body) {
	return await client.db('myDB').collection('users').insertOne(body)
}

async function userExists(name) {
	const result = await client
		.db('myDB')
		.collection('users')
		.find({ username: name })
		.toArray()
	return result
}

async function addRecord(body) {
	return await client.db('myDB').collection('transactions').insertOne(body)
}

async function getTransactions() {
	return await client.db('myDB').collection('transactions').find({}).toArray()
}

async function getTransactionById(id) {
	return await client
		.db('myDB')
		.collection('transactions')
		.findOne({ _id: ObjectId(id) })
}

async function updateTransactionByID(id, body) {
	return await client
		.db('myDB')
		.collection('transactions')
		.updateOne({ _id: ObjectId(id) }, { $set: body })
}

async function deleteTransactionById(id) {
	return await client
		.db('myDB')
		.collection('transactions')
		.deleteOne({ _id: ObjectId(id) })
}
async function getBalance() {
	return await client
		.db('myDB')
		.collection('users')
		.findOne({ username: 'gova' })
}

async function setBalance(body) {
	return await client
		.db('myDB')
		.collection('users')
		.updateOne({ username: 'gova' }, { $set: body })
}

export {
	hashPassword,
	addUser,
	userExists,
	addRecord,
	getTransactions,
	getTransactionById,
	updateTransactionByID,
	deleteTransactionById,
	getBalance,
	setBalance,
}
