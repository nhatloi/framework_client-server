import React from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {dispatchLogin} from '../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import { Form, Input, Button, Checkbox,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';



function LoginPage() {

    //const
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async e =>{
        try {
            const res = await axios.post('/user/login', {email:e.email,password:e.password})
            localStorage.setItem('firstLogin',true)
            dispatch(dispatchLogin())
            history.push('/')
            message.success(res.data.msg)
        } catch (err) {
            message.error(err.response.data.msg)
        }
    }

    //render
    return (
        <div className='body'>
            <div className='login-form'>
                <h2>Login</h2>
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="/forgot">
                        Forgot password?
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                        <a href="/register"> Register now?</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
        
    )
}

export default LoginPage
