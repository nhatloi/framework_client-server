import React ,{useState}from 'react'
import { Form,Button,Input,message,DatePicker} from 'antd';
import axios from 'axios'
import {useSelector} from 'react-redux'
import Checkbox from 'antd/lib/checkbox/Checkbox';

const { TextArea } = Input;

function Information(props) {

    const token = useSelector(state => state.token)
    const [check, setcheck] = useState(false)
    const infor = props.infor
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
      };
      const dateFormat = 'YYYY/MM/DD';

    const OnEditMovie =  async (values) =>{

        var {original_title,release_date,overview,trailer} = values
        original_title = !original_title?infor.original_title : original_title
        release_date = !release_date?infor.release_date : release_date
        overview = !overview?infor.overview : overview
        trailer = !trailer?infor.trailer : trailer

        var premiere
        if(check === true)
        {
            await axios.post('/movie/updatemovie',{id:infor._id,premiere:-1,original_title,release_date,overview,trailer},{headers:{Authorization:token}})
        }
        if(check === false)
            await axios.post('/movie/updatemovie',{id:infor._id,original_title,release_date,overview,trailer},{headers:{Authorization:token}})
        message.success('change information successfully')
    }

    const handleChange = (e) =>{
        setcheck(e.target.checked)
    }


    
    // acount
    if(props.account){
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
    }
    else{
        if(props.movie)
        {
            return (
                <div>
                    <Form name="information"  {...layout}  onFinish={OnEditMovie}
            
                    > 
                            <Form.Item label="background">
                                <img src={infor.backdrop_path}style={{top:'0',left:'0',width:'80%'}}/>
                            </Form.Item>
                            <Form.Item label="Poster">
                                <img src={infor.poster_path} style={{top:'0',left:'0',height:'500px'}}/>
                            </Form.Item>
                            <Form.Item label="Original title" name="original_title">
                                <Input placeholder={infor.original_title}/>
                            </Form.Item>
                            <Form.Item label="overview" name="overview">
                                <TextArea  rows={4} placeholder={infor.overview}/>
                            </Form.Item>
                            <Form.Item label="Release date" name="release_date">
                                <DatePicker format={dateFormat} placeholder={infor.release_date}/>
                            </Form.Item>
                            <Form.Item label="trailer" name="trailer">
                                <Input placeholder={infor.trailer}/>
                            </Form.Item>
                            <Form.Item label="old movies" name="old">
                                <Checkbox onChange={handleChange}/>
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form>
                </div>
            )
        }
        
    }
    
}

export default Information
