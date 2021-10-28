const elasticClient = require("./connection")

async function createIndex(index) {
    const query = {
        index
    }
    const response = await elasticClient.indices.create(query)
    return response
}

async function getIndex(index) {
    const query = {
        index
    }
    const response = await elasticClient.indices.get(query)
    return response
}

async function deleteIndex(index) {
    const query = {
        index
    }
    const response = await elasticClient.indices.delete(query)
    return response
}

async function listIndices() {
    const response = await elasticClient.cat.indices({format: 'json'})
    //return statements in an async function get wrapped in a promise.resolve
    return response
}

async function explainScore(indexName, docID, query) {
    try {
        const response = await elasticClient.explain({
            id: docID,
            index: indexName,
            body: query
        })
        return response
    } catch(err) {
        return err
    }
}

module.exports = { explainScore, createIndex, getIndex, deleteIndex, listIndices }

