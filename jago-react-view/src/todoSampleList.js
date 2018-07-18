import React from 'react'
import moment from 'moment'
import request from 'superagent'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Actions } from './actions.js'
import { todoListStore } from './stores'

export default class TodoSampleList extends React.Component {
    constructor (props) {
        super(props)
        todoListStore.onChange = () => {
            this.setState({ list: todoListStore.list })
        }
    }

    doClick (e) {
        const paramTitle = e.target.value
        const paramStartTime = moment().format('YYYY-MM-DD HH:mm:ss')

        request
            .get('/api/addTodo')
            .query({
                title: paramTitle,
                startTime: paramStartTime
            })
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    return
                }
                this.setState({addResult: res.body.result})
                this.loadListData()
            })
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

    render () {
        const defaultStyle = this.props.defaultStyle;
        const samples = this.props.samples
        const sampleButtons = samples.map(item => {
            return (<Button key={item} value={item} onClick={e => this.doClick(e)}>{item}</Button>)
        })
        return (<div style={{float:'right'}}>
                <ButtonGroup bsSize='small'>{sampleButtons}</ButtonGroup>
            </div>)
    }

}