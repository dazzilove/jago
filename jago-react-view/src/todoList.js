import React from 'react'
import moment from 'moment'
import request from 'superagent'
import { ButtonGroup, Button, Table, FormControl } from 'react-bootstrap'

export default class TodoList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            list: [],
            edited: false
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
                this.setState({list: data.body.list})
            })
    }

    handleChange (e) {
        this.setState({edited: true})

        const eId = e.target.id
        const eTitle = e.target.value
        const eList = this.state.list.map(item => {
            if (item._id == eId) {
                item._id = eId
                item.title = eTitle
                item.startTime = moment().format('YYYY-MM-DD HH:mm:ss')
                item.edited = true
            } 
            return item
        })

        this.setState({list: eList})
        console.log(JSON.stringify(this.state.list))
    }

    doClickOfDelete (e) {
        request
            .get('/api/deleteTodo')
            .query({ _id: e.target.id })
            .end((err, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                this.loadListData()
            })
    }

    doClickOfAdd (e) {
        const paramTitle = e.target.value
        const paramStartTime = moment().format('YYYY-MM-DD HH:mm:ss')

        request
            .get('/api/addTodo')
            .query({
                title: paramTitle,
                startTime: paramStartTime
            })
            .end((err, res) => {
                if (err) return ''
                console.log('res.body.result = ', res.body.result)
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
            return (<tr key={item._id}>
                        <td><FormControl 
                                type='text'
                                id={item._id}
                                value={item.title}
                                onChange={ e => this.handleChange(e) }/>
                        </td>
                        <td>{item.startTime}</td>
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