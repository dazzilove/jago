import React from 'react'
import ReactDOM from 'react-dom'
import { Well, Grid, Row, Col, RowProps } from 'react-bootstrap'

import TodayTitle from './todayTitle'
import TodoSampleList from './todoSampleList'
import TodoList from './todoList'
import SaveButton from './saveButton'

class App extends React.Component {

    render () {
        const samples = ['휴식', '잡무', '메일', '점심', '져녁', 'TODO']

        return (<div style={{margin:'20px', padding:'10px', border: '1px solid #999999'}}>
                    <Well bsSize="small">
                        <Grid>
                            <Row className="show-grid">
                                <Col xs={4}><TodayTitle /></Col>
                                <Col xs={8} ><TodoSampleList samples={samples}/></Col>
                            </Row>
                        </Grid>
                    </Well>
                    <TodoList />
                        <SaveButton />
            </div>)
    }
}

ReactDOM.render(<App />, document.getElementById('root'))