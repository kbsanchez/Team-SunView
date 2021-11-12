const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const indexRouter = require('./routes/indexRouter')
const { explainScore, reIndex, deleteIndex, bulkIndex } = require('./utils')

app.use(cors())
app.use(express.json())
app.use('/api/index', indexRouter)

app.post('/api/explain/:index/:docID', (req, res) => {
    const { index, docID } = req.params
    explainScore(index, docID, req.body)
    .then(response => {
        const { statusCode } = response
        if(statusCode != 200)
            res.status(statusCode).send(`Response returned with errors: status code ${statusCode}`)
        else
            res.send(response.body.explanation)
    })
})

app.post('/api/reindex/:source/:dest', (req, res) => {
    const { source, dest } = req.params
    reIndex(source, dest)
    .then(response => {
        const { statusCode } = response
        if(statusCode != 200)
            res.status(statusCode).send(`Response returned with errors: status code ${statusCode}`)
        else {
            deleteIndex(source)
            res.send(`${source} deleted and reindexed to ${dest}!`)
        }
    })
})

app.post('/api/bulk/:dest', (req, res) => {
    bulkIndex(req.body.indices, req.params.dest).then(response => {
        const { statusCode } = response
        if(statusCode != 200)
            res.status(statusCode).send(`Response returned with errors: status code ${statusCode}`)
        else
            res.send(`${response.body.items.length} doc(s) were indexed`)
    })
})

// if(process.env.NODE_ENV === "production") {
//     app.use(express.static('./dist/'))
//     app.get("*", (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

app.listen(PORT, () => console.log('running on port ' + PORT))