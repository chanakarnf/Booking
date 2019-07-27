import React ,{Component} from 'react';
import firebase from './firebase'
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { Form, Select, Input, Button } from 'antd';
const { TextArea } = Input;
const {  RangePicker } = DatePicker;
const db = firebase.firestore();
const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;
  
class Booking extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            DateCheckIn : "",
            DateCheckOut : "",
            Price : "",
            Type : "",
            Name : "",
            Tell : "",
            Email : "",
            Details : "", 
            Earnest : "" //เงินมัดจำ
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            console.log('Received state of form: ', this.state.Details);
            console.log('Received values of form: ', values.checkinout[0]._d);
            db.collection("Booking").add({
                Name : values.name,
                Tell : values.prefix+values.phone,
                Email : values.email,
                DateCheckIn : this.state.DateCheckIn,
                DateCheckOut : this.state.DateCheckOut,
                Details : this.state.Details,
                //ต้องเพิ่ม price & earnest
            })
          }
        });
    };
    // onChangeNumber = (value) => {
    //     this.setState({
    //         People : value
    //     },console.log(this.state))
    // }
    onChangeDate = (date, dateString) => {
        console.log(date, dateString);
        console.log('Date: ' , dateString[0]);
        this.setState({
            DateCheckIn : dateString[0],
            DateCheckOut : dateString[1]
        },)
      }
    onchangeTextInput = (e) => {
        // console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        }, 
        // console.log(this.state)
        )
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 7 },
          };
          const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+66',
          })(
            <Select style={{ width: 70 }}>
              <Option value="08">+66</Option>
            </Select>,
          );
          const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
          };
        return (
           <div>
               <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="ชื่อผู้จอง :" hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="เบอร์ติดต่อ :" hasFeedback>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                    </Form.Item>
                    <Form.Item label="E-mail" hasFeedback >
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="เวลาที่ต้องการ check-in & checkout" hasFeedback>
                        {getFieldDecorator('checkinout', rangeConfig)(<RangePicker 
                        onChange={this.onChangeDate} format={dateFormat}/>)}
                    </Form.Item>
                    <TextArea name="Details" onChange={this.onchangeTextInput}
                        placeholder="รายละเอียดเพิ่มเติมเช่น ต้องการเตียงเสริม (คิดเพิ่มชุดละ 100 บาท)" 
                        autosize={{ minRows: 2, maxRows: 4 }}
                    />

                    <Form.Item label="ยอดค่าใช้จ่ายทั้งหมด : " name="price"> 
                        <span className="ant-form-text">0</span>
                    </Form.Item>
                    <Form.Item label="เงินมัดจำที่ต้องจ่าย : " name="earnest">
                        <span className="ant-form-text">0</span>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
               </Form>
           </div>
        )
    }

}


export default Form.create()(Booking);