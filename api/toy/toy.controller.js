import { toyService } from './toy.service.js'
import { logger } from '../../services/logger.service.js'


// // GET toys
// app.get('/api/toy', (req, res) => {
//   const { filterBy = {}, sortBy = {}, pageIdx } = req.query
//   toyService.query(filterBy, sortBy, pageIdx)
//     .then(toys => {
//       res.send(toys)
//     })
//     .catch(err => {
//       loggerService.error('Cannot load toys', err)
//       res.status(400).send('Cannot load toys')
//     })
// })

export async function getToys(req, res) {
    try {
        const { filterBy = {}, sortBy = {}, pageIdx } = req.query
        // const filterBy = {
        //     txt: req.query.txt || '',
        // }
        const toys = await toyService.query(filterBy, sortBy, pageIdx)
        res.json(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

// app.get('/api/toy/:toyId', (req, res) => {
//   const { toyId } = req.params
//   toyService.get(toyId)
//     .then(toy => {
//       res.send(toy)
//     })
//     .catch(err => {
//       loggerService.error('Cannot get toy', err)
//       res.status(400).send(err)
//     })
// })

export async function getToyById(req, res) {
    try {
        const toyId = req.params.id
        const toy = await toyService.getById(toyId)
        res.json(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

// app.post('/api/toy', (req, res) => {
//   const { name, price, labels } = req.body
//   const toy = {
//     name,
//     price: +price,
//     labels,
//   }
//   toyService.save(toy)
//     .then(savedToy => {
//       res.send(savedToy)
//     })
//     .catch(err => {
//       loggerService.error('Cannot add toy', err)
//       res.status(400).send('Cannot add toy')
//     })
// })


export async function addToy(req, res) {
    // const { loggedinUser } = req

    try {
        const toy = req.body
        // toy.owner = loggedinUser
        const addedToy = await toyService.add(toy)
        res.json(addedToy)
    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

// app.put('/api/toy', (req, res) => {
//   const { name, price, _id, labels } = req.body
//   const toy = {
//     _id,
//     name,
//     price: +price,
//     labels,
//   }
//   toyService.save(toy)
//     .then(savedToy => {
//       res.send(savedToy)
//     })
//     .catch(err => {
//       loggerService.error('Cannot update toy', err)
//       res.status(400).send('Cannot update toy')
//     })
// })

export async function updateToy(req, res) {
    try {
        const toy = req.body
        const updatedToy = await toyService.update(toy)
        res.json(updatedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

// app.delete('/api/toy/:toyId', (req, res) => {
//   const { toyId } = req.params
//   toyService.remove(toyId)
//     .then(msg => {
//       res.send({ msg, toyId })
//     })
//     .catch(err => {
//       loggerService.error('Cannot delete toy', err)
//       res.status(400).send('Cannot delete toy, ' + err)
//     })
// })

export async function removeToy(req, res) {
    try {
        const toyId = req.params.id
        const deletedCount = await toyService.remove(toyId)
        res.send(`${deletedCount} toys removed`)
    } catch (err) {
        logger.error('Failed to remove toy', err)
        res.status(500).send({ err: 'Failed to remove toy' })
    }
}

