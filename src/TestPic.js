import React ,{Component} from 'react';
import firebase from './firebase'
import 'antd/dist/antd.css';
import { Form, Select, Input, Button } from 'antd';
import { InputNumber } from 'antd';
import { Card, Col, Row } from 'antd';
import zoneA from '../img/resort/zoneA.png';
const db = firebase.firestore();
  
class TestPic extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           
        }
    }
    render(){
        return (
            <div>
                 <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={16}>
                    <Col span={8}>
                        <Card img src = {zoneA}  bordered={false}>
                            <InputNumber min={1} max={10} defaultValue={3}  />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Card title" bordered={false}>
                        <img src = {zoneA} id ="headbookct"/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Card title" bordered={false}>
                        Card content
                        </Card>
                    </Col>
                    </Row>
                </div>
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={16}>
                    <Col span={8}>
                        <Card title="Card title" bordered={false}>
                        Card content
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Card title" bordered={false}>
                        Card content
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Card title" bordered={false}>
                        Card content
                        </Card>
                    </Col>
                    </Row>
                </div>
            </div>
        )
    }

}

export default Form.create()(TestPic);