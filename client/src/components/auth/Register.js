import React from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {
    Form,
    Input,
    Checkbox,
    Button,
    message
  } from 'antd';



///form
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

const tailFormItemLayout = {
wrapperCol: {
    xs: {
    span: 24,
    offset: 0,
    },
    sm: {
    span: 16,
    offset: 8,
    },
},
};


//function

function Register() {
    //const 
    const history = useHistory()

    const handleSubmit = async e =>{
        try {
            const res = await axios.post('/user/register', {name:e.name,email:e.email,password:e.password,cf_password:e.confirm})
            const success ={
                title:'Sign Up Success!',
                subTitle:'Check email for activation!'
            }
            history.push(`/success/${success.title}/${success.subTitle}`)
            message.success(res.data.msg)

        } catch (err) {
            message.error(err.response.data.msg)
        }
    }

    return (
        <div className='body'>
            <div className='register-form'>
                <h2>Register</h2>
                <Form
                    {...formItemLayout}
                    name="register"
                    onFinish={handleSubmit}
                    >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label={
                        <span>
                            Name
                        </span>
                        }
                        rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please your password!',
                            },
                            () => ({
                                validator(rule, value) {
                                if (value.length < 6) {
                                    
                                    return Promise.reject('password must be at least 6 character.');
                                }
                                return Promise.resolve();
                                },
                            }),
                            ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                        {
                            validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                        },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                        I have read the <a href="/agreement">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                        Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
           
        </div>
    )
}

export default Register
