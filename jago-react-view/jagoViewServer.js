const express = require('express')
const portNo = 3000
const app = express()
app.listen(portNo, () => {
    console.log(`Server Started => http://localhost:${portNo}`)
})

app.use('/public', express.static('./public'))
app.get('/', (req, res) => {
    res.redirect(302, '/public')
})





const NeDB = require('nedb')
const path = require('path')

const db = new NeDB({
    filename: path.join(__dirname, 'jago.db'),
    autoload: true
})

const mydb = new NeDB({
    filename: path.join('../..', 'jago-mydb.db'),
    autoload: true
})

app.get('/api/addTodo', (req, res) => {
    const q = req.query
    mydb.insert({
        title: q.title,
        startTime: q.startTime
    }, (err, newDoc) => {
        if (err) {
            console.log(err)
            sendJSON(res, false, {msg: err})
            return
        }
        sendJSON(res, true, {id: newDoc._id})
    })
})

app.get('/api/todoList', (req, res) => {
    mydb.find({}).sort({startTime: 1}).exec((err, data) => {
        if (err) {
            sendJSON(res, false, {msg: err})
            return
        }
        sendJSON(res, true, {list: data})
    })
})

app.get('/api/deleteTodo', (req, res) => {
    const q = req.query
    console.log('q._id = ', q._id)
    mydb.remove({_id: q._id}, {}, (err, numRemoved) => {
        if (err) {
            sendJSON(res, false, {msg: err})
            return
        }
        console.log('numRemoved = ', numRemoved)
        sendJSON(res, true, {numRemoved: numRemoved})
    })
})

function sendJSON(res, result, obj) {
    obj['result'] = result
    res.json(obj)
}