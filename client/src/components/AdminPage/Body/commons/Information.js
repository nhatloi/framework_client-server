import React from 'react'
import { Form,Button,Input,message} from 'antd';
import axios from 'axios'
import {useSelector} from 'react-redux'

const { TextArea } = Input;

function Information(props) {

    const token = useSelector(state => state.token)
    const infor = props.infor
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
      };

    const OnEditMovie =  async (values) =>{
        await axios.post('/movie/updatemovie',{id:infor._id,original_title:values.original_title,release_date:values.release_date,overview:values.overview,trailer:values.trailer},{headers:{Authorization:token}})
        message.success('change information successfully')
        console.log(infor._id)
    }


    
    // acount
    if(props.account)
    return (
        <div className='information-user'>
            <div className= 'left-infor'>
                <img alt='avatar' src={infor.avatar}/><br/>
            </div>
            <div>
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
        <div>
            <Form name="information"  {...layout}  onFinish={OnEditMovie}
            initialValues={{
                overview: infor.overview,
                original_title:infor.original_title,
                release_date:infor.release_date,
                trailer:infor.trailer
              }}
            > 
                    <Form.Item label="background">
                        <img src={infor.backdrop_path}style={{top:'0',left:'0',width:'80%'}}/>
                    </Form.Item>
                    <Form.Item label="Poster">
                        <img src={infor.poster_path} style={{top:'0',left:'0',height:'500px'}}/>
                    </Form.Item>
                    <Form.Item label="Original title" name="original_title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="overview" name="overview">
                        <TextArea  rows={4}/>
                    </Form.Item>
                    <Form.Item label="Release date" name="release_date">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="trailer" name="trailer">
                        <Input/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form>
        </div>
    )
}

export default Information
