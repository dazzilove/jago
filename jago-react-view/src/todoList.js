import React from 'react'
import moment from 'moment'
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
        const tempList = [
            {listNo:0, title:'휴식', startTime: '2018.08.28 23:45:23', edited: false},
            {listNo:1, title:'잡무', startTime: '2018.08.28 23:45:23', edited: false},
            {listNo:2, title:'여러가지 일', startTime: '2018.08.28 23:45:23', edited: false},
            {listNo:3, title:'제목 길게 길게.. 그리고 길게 길게', startTime: '2018.08.28 23:45:23', edited: false}
        ]
        this.setState({list: tempList})
    }

    handleChange (e) {
        this.setState({edited: true})

        const eListNo = e.target.id
        const eTitle = e.target.value
        const eList = this.state.list.map(item => {
            if (item.listNo == eListNo) {
                item.listNo = eListNo
                item.title = eTitle
                item.startTime = moment().format('YYYY-MM-DD HH:mm:ss')
                item.edited = true
            } 
            return item
        })

        this.setState({list: eList})
        console.log(JSON.stringify(this.state.list))
    }

    render () {
        const listTitle = (<thead>
                            <th> No.</th>
                            <th> Title</th>
                            <th width={100}> StartTime</th>
                            <th width={150}> Etc...</th>
                           </thead>) 
        const listRows = this.state.list.map(item => {
            return (<tr key={item.listNo}>
                        <td>{item.listNo}</td>
                        <td><FormControl 
                                type='text'
                                id={item.listNo + ''}
                                value={item.title}
                                onChange={ e => this.handleChange(e) }/>
                        </td>
                        <td>{item.startTime}</td>
                        <td>
                            <ButtonGroup bsSize='xsmall'>
                                <Button>Delete</Button>
                                <Button>Add</Button>
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