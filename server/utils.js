const elasticClient = require("./connection")

async function insertDoc(index, body) {
    const query = {
        index,
        body
    }
    const response = await elasticClient.index(query)
    return response
}

async function createIndex(index, body) {
    try {
        const query = {
            index,
            body
        }
        const response = await elasticClient.indices.create(query)
        return response
    } catch(err) {
        return err
    }
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

async function getType(index) {
    try {
        const query = {
            index
        }
        const response = await elasticClient.search(query)
        return response
    } catch(err) {
        return err
    }
}

async function bulkIndex(indexNames, dest) {
    try {
        const dataset = []
        for (const currentIndexName of indexNames) {
            const response = await elasticClient.search({index: currentIndexName})
            const flattened = response.body.hits.hits.flatMap(doc => [{ index: { _index: dest } }, doc["_source"]])
            dataset.push(...flattened)
        }
        console.log(dataset)
        const response = await elasticClient.bulk({refresh: true, body: dataset})
        return response
    } catch(err) {
        return err
    }
}


module.exports = { insertDoc, getType, bulkIndex, reIndex, explainScore, createIndex, getIndex, deleteIndex, listIndices }

