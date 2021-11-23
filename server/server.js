const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const indexRouter = require('./routes/indexRouter')
const { explainScore, reIndex, deleteIndex, bulkIndex } = require('./utils')
const cron = require('node-cron')

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

app.post('/api/scheduler', (req, res) => {
    const { minute, hour, dayOfMonth, month, dayOfWeek, source, dest } = req.body.scheduledJob
    const task = cron.schedule(`${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`, () => {
        reIndex(source, dest)
        .then(response => {
            const { statusCode } = response
            if(statusCode != 200)
                console.log(`Task failed: status code ${statusCode}`)
            else 
                console.log(`${source} reindexed to ${dest}!`)
        })
    }, {
        scheduled: true,
        timezone: 'America/Nassau'
    })
    task.start()
    console.log("Task scheduled..")
})

app.listen(PORT, () => console.log('running on port ' + PORT))