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

mydb.getMax = function(fieldName, onFind){
    db.find({}).sort({_id:-1}).limit(1).exec(function (err, docs) {onFind && onFind(err, docs['_id']);});
    return localDb;
 }

const express = require('express')
const portNo = 3000
const app = express()
app.listen(portNo, () => {
    console.log(`Server started => http://localhost:${portNo}`)
})

app.use('/public', express.static('./public'))
app.get('/', (req, res) => {
    res.redirect(302, '/public')
})

app.get('/api/addTodo', (req, res) => {
    const params = req.params

    const listNo = getNextListNo();
    mydb.insert({
        list_no: listNo,
        title: params.title,
        startDate: params.startDate
    }, (err, newDoc) => {
        if (err) {
            console.log(err)
            sendJSON(res, false, {msg: err})
            return
        }
        sendJSON(res, true, {id: newDoc._id})
    })
})

function sendJSON(res, result, obj) {
    obj['result'] = result
    res.json(obj)
}

getNextListNo = () => {
    return 1
}