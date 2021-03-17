import React from 'react'
import { Form} from 'antd';

function InformationUser(props) {
    const infor = props.infor
    // acount
    if(props.account)
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


    if(props.movie)
    return (
        <div className='information' style={{backgroundImage:`url("${infor.backdrop_path}")`,backgroundRepeat: 'no-repeat',backgroundPosition:'center'}}>
           <img src={infor.poster_path} style={{top:'0',left:'0',height:'500px'}}/>
        </div>
    )
}

export default InformationUser
