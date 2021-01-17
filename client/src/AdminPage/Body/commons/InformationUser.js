import React from 'react'
import { Form} from 'antd';

function InformationUser(props) {
    const infor = props.infor
    return (
        <div className='information'>
            <div className= 'left-infor'>
                <img alt='avatar' src={infor.avatar}/><br/>
            </div>
            <div className='right-infor'>
            <Form name="information">
                <Form.Item label="_Id">
                    {infor._id}
                </Form.Item>
                <Form.Item label="Email">
                    {infor.email}
                </Form.Item>
                <Form.Item label="Name">
                    {infor.name}
                </Form.Item>
                <Form.Item label="Type Account">
                    {infor.role=== 1?<div>Admin Account</div>:<div>User Account</div>}
                </Form.Item>
                <Form.Item label="Date Create">
                    {infor.createdAt}
                </Form.Item>
                </Form>
            </div>

        </div>
    )
}

export default InformationUser
