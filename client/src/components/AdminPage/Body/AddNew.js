import React from 'react'
import {Typography,Form, Input, Button, Checkbox } from 'antd';


const { Text} = Typography;

function AddNew() {
    return (
        <div className='body-container'>
        <h2><Text underline>Add new</Text></h2>
        <Form
            name="basic"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
    )
}

export default AddNew
