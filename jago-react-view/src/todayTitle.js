import React from 'react'
import moment from 'moment'
import { Label } from 'react-bootstrap'

export default class TodayTitle extends React.Component {
    constructor (props) {
        super(props)
    }

    getDayOfWeekString () {
        const dayOfWeek = moment().day()
        if (dayOfWeek === 0) return '일'
        if (dayOfWeek === 1) return '월'
        if (dayOfWeek === 2) return '화'
        if (dayOfWeek === 3) return '수'
        if (dayOfWeek === 4) return '목'
        if (dayOfWeek === 5) return '금'
        if (dayOfWeek === 6) return '토'
    }

    render () {
        const dayOfWeek = moment().day()
        const now = moment(new Date()).format('YYYY-MM-DD')+ ' ' + this.getDayOfWeekString()
        return (<div style={{fontSize:'20px', fontWeight:'bold'}}>{now}</div>)
    }

}