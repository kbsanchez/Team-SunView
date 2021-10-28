const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const indexRouter = require('./routes/indexRouter')
const { explainScore } = require('./utils')

app.use(cors())
app.use(express.json())
app.use('/api/index', indexRouter)

app.post('/api/explain/:index/:docID', (req, res) => {
    const { index, docID } = req.params
    explainScore(index, docID, req.body)
    .then(response => {
        if(response.statusCode == 404)
            res.status(404).send("Bad request status code " + 404)
        else
            res.send(response.body.explanation)
    })
  
})


app.listen(PORT, () => console.log('running on port ' + PORT))