import React from 'react'
import moment from 'moment'
import request from 'superagent'
import { ButtonGroup, Button, Table, FormControl } from 'react-bootstrap'
import { Actions } from './actions.js'
import { todoListStore } from './stores'

export default class TodoList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            list: [],
            edited: false
        }

        todoListStore.onChange = () => {
            this.setState({ list: todoListStore.list })
        }

    }

    componentWillMount () {
        this.loadListData()
    }

    loadListData () {
        request
            .get('/api/todoList')
            .end((err, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                Actions.changeTodoList(data.body.list)
            })
    }

    handleChangeTitle (e) {
        this.setState({edited: true})

        const eId = e.target.id
        const eTitle = e.target.value
        const eList = this.state.list.map(item => {
            if (item._id == eId) {
                item._id = eId
                item.title = eTitle
                item.startTime = moment().format('YYYY-MM-DD HH:mm')
                item.edited = true
            } 
            return item
        })

        Actions.changeTodoList(eList)
    }

    handleChangeStartTime (e) {
        this.setState({edited: true})

        const eId = e.target.id
        const eStartTime = e.target.value
        const eList = this.state.list.map(item => {
            if (item._id == eId) {
                item._id = eId
                item.title = item.title
                item.startTime = item.startTime.substring(0, 10) + eStartTime
                item.edited = true
            } 
            return item
        })

        Actions.changeTodoList(eList)
    }

    getEditedList () {
        return this.state.list.filter(item => {
            return (item.edited === true)
        })
    }

    doClickOfDelete (e) {
        const editedList = JSON.stringify(this.getEditedList())
        request
            .get('/api/deleteTodo')
            .query({ _id: e.target.id, list: editedList })
            .end((err, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                this.loadListData()
            })
    }

    doClickOfAdd (e) {
        const editedList = JSON.stringify(this.getEditedList())
        const paramTitle = e.target.value
        const paramStartTime = moment().format('YYYY-MM-DD HH:mm')
        request
            .get('/api/addTodo')
            .query({
                title: paramTitle,
                startTime: paramStartTime, 
                list: editedList
            })
            .end((err, res) => {
                if (err) return
                this.loadListData()
            })

    }

    render () {
        const listTitle = (<thead>
                            <th> Title</th>
                            <th width={100}> StartTime</th>
                            <th width={150}> Etc...</th>
                           </thead>) 
        const listRows = this.state.list.map(item => {
            const itemStartTime = item.startTime
            const startDay = itemStartTime.substring(0, 10)
            const startTimeStr = itemStartTime.substring(10, itemStartTime.length)
            return (<tr key={item._id}>
                        <td><FormControl 
                                type='text'
                                id={item._id}
                                value={item.title}
                                onChange={ e => this.handleChangeTitle(e) }/>
                        </td>
                        <td>
                            <div>{startDay}</div>
                            <FormControl 
                                type='text'
                                id={item._id}
                                value={startTimeStr}
                                onChange={ e => this.handleChangeStartTime(e) }/>
                        </td>
                        <td>
                            <ButtonGroup bsSize='xsmall'>
                                <Button 
                                    id={item._id}
                                    onClick={e => { this.doClickOfDelete(e) }}>Delete</Button>
                                <Button
                                    id={item._id}
                                    value={item.title}
                                    onClick={e => {this.doClickOfAdd(e)}}>Add</Button>
                            </ButtonGroup>
                        </td>
                    </tr>)
        })
        const listTable = (<Table  striped condensed hover>
                            {listTitle}
                            <tbody>{listRows}</tbody>
                        </Table>)
        return (<div>{listTable}</div>)
    }
}