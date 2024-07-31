import { ObjectId } from 'mongodb'

import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'


export const toyService = {
	remove,
	query,
	getById,
	add,
	update
}

async function query(filterBy = { txt: '' }, sortBy = {}, pageIdx) {
	try {
		const criteria = {
			name: { $regex: filterBy.txt, $options: 'i' },
		}
		const collection = await dbService.getCollection('toy')
		var toys = await collection.find(criteria).toArray()
		return toys
	} catch (err) {
		logger.error('cannot find toys', err)
		throw err
	}
}

async function getById(toyId) {
	try {
		const collection = await dbService.getCollection('toy')
		const toy = await collection.findOne({ _id: ObjectId.createFromHexString(toyId) })
		toy.createdAt = toy._id.getTimestamp()
		return toy
	} catch (err) {
		logger.error(`while finding toy ${toyId}`, err)
		throw err
	}
}

async function remove(toyId) {
	try {
		const collection = await dbService.getCollection('toy')
		const { deletedCount } = await collection.deleteOne({ _id: ObjectId.createFromHexString(toyId) })
        return deletedCount
	} catch (err) {
		logger.error(`cannot remove toy ${toyId}`, err)
		throw err
	}
}

async function add(toy) {
	try {
		const collection = await dbService.getCollection('toy')
		await collection.insertOne(toy)
		return toy
	} catch (err) {
		logger.error('cannot insert toy', err)
		throw err
	}
}
// function save(toy) {
// 	if (toy._id) {
// 	  const idx = toys.findIndex(currToy => currToy._id === toy._id)
// 	  toys[idx] = { ...toys[idx], ...toy }
// 	} else {
// 	  toy._id = _makeId()
// 	  toy.createdAt = Date.now()
// 	  toy.inStock = true
// 	  toys.unshift(toy)
// 	}
// 	return _saveToysToFile().then(() => toy)
//   }
async function update(toy) {
	try {
		const toyToSave = {
			name: toy.name,
			price: toy.price,
		}
		const collection = await dbService.getCollection('toy')
		await collection.updateOne({ _id: ObjectId.createFromHexString(toy._id) }, { $set: toyToSave })
		return toy
	} catch (err) {
		logger.error(`cannot update toy ${toy._id}`, err)
		throw err
	}
}

