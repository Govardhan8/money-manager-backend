import express from 'express'
import {
	addRecord,
	getTransactions,
	getTransactionById,
	updateTransactionByID,
	deleteTransactionById,
} from '../utils.js'

const router = express.Router()

router.route('/').get(async (request, response) => {
	const result = await getTransactions()
	response.send(result)
})

router.route('/add').post(async (request, response) => {
	const body = request.body
	body.date = body.date ? body.date : Date()
	const result = await addRecord(body)
	response.send(result)
})

router
	.route('/:id')
	.get(async (request, response) => {
		const { id } = request.params
		const transaction = await getTransactionById(id)
		response
			.status(transaction ? 200 : 404)
			.send(transaction ? transaction : { message: 'Not found' })
	})
	.put(async (request, response) => {
		const { id } = request.params
		const body = request.body
		const updatedTransaction = await updateTransactionByID(id, body)
		const result = await getTransactionById(id)
		response.send(result)
	})
	.delete(async (request, response) => {
		const { id } = request.params
		const result = await deleteTransactionById(id)
		response.send(result)
	})

export default router
