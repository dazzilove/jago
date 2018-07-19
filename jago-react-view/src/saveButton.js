import React from 'react'
import request from 'superagent'
import { Button } from 'react-bootstrap'
import { todoListStore } from './stores.js'

export default class SaveButton extends React.Component {
    constructor (props) {
        super(props)
    }

    handleChange (e) {
        const list = todoListStore.list.filter(item => {
            return (item.edited === true)
        })
        const editedList = JSON.stringify(list)
        request
            .get('/api/saveEditedList')
            .query({ list: editedList })
            .end((err, data) => {
                if (err) {
                    console.log(err)
                    return
                }
            })
    }


    render () {
        const wellStyles = { width: '100%', margin: '0 auto 5px', padding: '10px' };
        return (<div className="well small" style={wellStyles}>
                    <Button bsStyle="primary" bsSize="xsmall"
                        onClick={e => this.handleChange(e) }>Save</Button>
                </div>)
    }

}