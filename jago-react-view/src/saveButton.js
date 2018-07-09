import React from 'react'
import moment from 'moment'
import { Button, well } from 'react-bootstrap'

export default class SaveButton extends React.Component {
    constructor (props) {
        super(props)
    }


    render () {
        const wellStyles = { width: '100%', margin: '0 auto 5px', padding: '10px' };
        return (<div className="well small" style={wellStyles}><Button bsStyle="primary" bsSize="xsmall">Save</Button></div>)
    }

}