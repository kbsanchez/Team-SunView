const express = require('express')
const router = express.Router()

const { insertDoc, createIndex, getIndex, deleteIndex, listIndices, getType } = require('../utils')

router.put('/:index', (req, res) => {
    createIndex(req.params.index, {
        settings: req.body.config.settings
    })
    .then(response => {
        const { statusCode } = response
        if(statusCode != 200)
            res.status(statusCode).send(`Response returned with errors: status code ${statusCode}`)
        else {
            insertDoc(req.params.index, {
                indexType: req.body.config.indexType
            })
            res.send(response)
        }
    })
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
.get('/:index/type', (req, res) => {
    getType(req.params.index)
    .then(response => {
        const { statusCode } = response
        if(statusCode != 200)
            res.status(statusCode).send(`Response returned with errors: status code ${statusCode}`)
        else 
            response.body.hits.hits.forEach(doc => {
                if(doc._source.indexType !== undefined)
                    res.send(doc._source.indexType)
            })
            
    })
})

module.exports = router