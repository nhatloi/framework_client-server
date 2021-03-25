import React from 'react'
import { Form,Button,Input,message,DatePicker} from 'antd';
import axios from 'axios'
import moment from 'moment'
import {useSelector} from 'react-redux'

const { TextArea } = Input;

function Information(props) {

    const token = useSelector(state => state.token)
    const infor = props.infor
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
      };
      const dateFormat = 'YYYY/MM/DD';

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
                ['run-time']: infor.runtime?infor.runtime:1,
                ['original_title']:infor.original_title,
                ['title']:infor.title,
                ['overview']:infor.overview,
                ['release_date']:moment(infor.release_date,dateFormat),
                ['backdrop_path']:infor.backdrop_path,
                ['poster_path']:infor.poster_path,
                ['directors']:infor.directors,
                ['actors']:infor.actors,
                ['trailer']:infor.trailer,
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
                        <DatePicker format={dateFormat}/>
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
