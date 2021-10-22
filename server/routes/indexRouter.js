const express = require('express')
const router = express.Router()

const { createIndex, getIndex, deleteIndex, listIndices } = require('../utils')

router.put('/:index', (req, res) => {
    createIndex(req.params.index)
    .then(response => res.send(response))
})
.get('/:index', (req, res) => {
    getIndex(req.params.index)
    .then(response => res.send(response))
})
.delete('/:index', (req, res) => {
    deleteIndex(req.params.index)
    .then(response => res.send(response))
})
.get('/', (req, res) => {
    listIndices()
    .then(response => {
        res.send(response.body)
    })
})

module.exports = router