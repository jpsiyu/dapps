const express = require('express')
const path = require('path')
const packJson = require('../package.json')

const app = express()
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(express.static(path.resolve(__dirname, '../client/public')))

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

app.listen(packJson.port, console.log(`server listen on port ${packJson.port}`))
