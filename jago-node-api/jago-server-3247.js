const express = require('express')
const portNo = 3000
const app = express()
app.listen(portNo, () => {
    console.log(`Server started => http://localhost:${portNo}`)
})