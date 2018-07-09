import React from 'react'
import moment from 'moment'
import request from 'superagent'
import { Button, ButtonGroup } from 'react-bootstrap'

export default class TodoSampleList extends React.Component {
    constructor (props) {
        super(props)
    }

    doClick (e) {
        window.alert(e.target.value)
        const paramTitle = e.target.value
        const paramStartDate = moment().format('YYYY-MM-DD HH:mm:ss')

        request
            .post('http://localhost:3000/api/todo')
            .send({
                title: paramTitle,
                startDate: paramStartDate
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return ''
                console.log('res.body.status = ', res.body.status)
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