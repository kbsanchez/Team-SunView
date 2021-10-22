const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const indexRouter = require('./routes/indexRouter')

app.use(cors())
app.use(express.json())
app.use('/api/index', indexRouter)



app.listen(PORT, () => console.log('running on port ' + PORT))