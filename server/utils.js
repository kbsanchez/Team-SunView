const elasticClient = require("./connection")

async function createIndex(index, settings) {
    const query = {
        index,
        body: settings
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

async function reIndex(source, dest) {
    try {
        const query = {
            waitForCompletion: true,
            refresh: true,
            body: {
                source: {
                    index: source
                },
                dest: {
                    index: dest
                }
            }
        }
        const response = await elasticClient.reindex(query)
        return response
    } catch(err) {
        return err
    }
}

module.exports = { reIndex, explainScore, createIndex, getIndex, deleteIndex, listIndices }

