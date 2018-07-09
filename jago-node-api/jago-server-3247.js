const NeDB = require('nedb')
const path = require('path')

const db = new NeDB({
    filename: path.join(__dirname, 'jago.db'),
    autoload: true
})

const express = require('express')
const portNo = 3000
const app = express()
app.listen(portNo, () => {
    console.log(`Server started => http://localhost:${portNo}`)
})
