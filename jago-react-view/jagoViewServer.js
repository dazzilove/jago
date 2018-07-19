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

app.get('/api/todoList', (req, res) => {
    mydb.find({}).sort({startTime: 1}).exec((err, data) => {
        if (err) {
            sendJSON(res, false, {msg: err})
            return
        }
        sendJSON(res, true, {list: data})
    })
})

app.get('/api/addTodo', (req, res) => {
    const q = req.query
    saveEditedList(q.list)
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

app.get('/api/deleteTodo', (req, res) => {
    const q = req.query
    saveEditedList(q.list)
    mydb.remove({_id: q._id}, {}, (err, numRemoved) => {
        if (err) {
            sendJSON(res, false, {msg: err})
            return
        }
        console.log('numRemoved = ', numRemoved)
        sendJSON(res, true, {numRemoved: numRemoved})
    })
})

app.get('/api/saveEditedList', (req, res) => {
    saveEditedList(req.query.list)
})

function saveEditedList (list) {
    console.log('saveEditedList ==> list = ')
    console.log(list)
    const requestList = JSON.parse(list)
    console.log(requestList)
    requestList.map(item => {
        mydb.update(
            { _id: item._id}, 
            { title: item.title, startTime: item.startTime }, 
            {}, 
            (err, numReplaced) => {
                if (err) {
                    console.log(err)
                    return
                }
        })
    })
}

function sendJSON(res, result, obj) {
    obj['result'] = result
    res.json(obj)
}