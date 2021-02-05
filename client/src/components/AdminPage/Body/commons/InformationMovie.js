import React,{useState,useEffect} from 'react'
import { Upload,Skeleton, Space ,Form,Input,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Rate,
    Checkbox,
    Row,
    Col,} from 'antd';
import axios from 'axios'
import './commons.css'
import { UploadOutlined, InboxOutlined ,PlusOutlined,LoadingOutlined} from '@ant-design/icons';

function InformationMovie(props) {
    const {data,soureFetch} = props
    const [movie, setmovie] = useState()

    useEffect(() => {
        if(soureFetch === 'themoviedb') fetcMoviesThemoviedb(data)
    }, [data])

    const fetcMoviesThemoviedb = async(data) => {
        try {
            const res = await axios.post('/movie/themoviedbdetail',{id:data})
            setmovie(res.data.movie)
            console.log(movie)
        } catch (err) {
           return err.response.data.msg
        }
       
    }

    const { Option } = Select;
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
    
    const uploadButton = (
        <div>
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const Loading = (
        <div>
            <Skeleton.Image active={true} /> 
            <Skeleton active={true}/> 
        </div>
    );




    if(soureFetch === 'new'){
        return (
            <div>   
                {Loading}        
            </div>
        )
    }
    else{
        return (
            <div> 
            {
                movie?
                <div>
                    {/* {movie.poster_path? <img src={movie.poster_path} style={{height:'500px'}}/>:uploadButton}
                    <div>
                        {movie.original_title}
                        {movie.release_date}
                        {movie.runtime}
                        {movie.actors}
                        {movie.directors}
                        {movie.title}
                        {movie.overview}
                    </div> */}
                     <Form
                        name="validate_other"
                        {...formItemLayout}
                        // onFinish={onFinish}
                        initialValues={{
                            ['run-time']: 1,
                            ['checkbox-group']: ['A', 'B'],
                            rate: 3.5,
                        }}
                        >
                        <Form.Item label="Title">
                            <Input defaultValue={movie.title} />
                        </Form.Item>
                        <Form.Item label="original title">
                            <Input defaultValue={movie.original_title} />
                        </Form.Item>
                        <Form.Item label="Run Time">
                            <Form.Item name="run-time" noStyle>
                            <InputNumber min={1} />
                            </Form.Item>
                            <span className="ant-form-text"> Minutes</span>
                        </Form.Item>
                        <Form.Item name="rate" label="Rate">
                            <Rate />
                        </Form.Item>

                        <Form.Item
                            name="upload"
                            label="Upload"
                            valuePropName="fileList"
                            // getValueFromEvent={normFile}
                            extra="longgggggggggggggggggggggggggggggggggg"
                        >
                            <Upload name="logo" action="/upload.do" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label="Dragger">
                            <Form.Item name="dragger" valuePropName="fileList"  noStyle>
                            <Upload.Dragger name="files" action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                                <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                        </Form>

                </div>
                :<div>{Loading}</div>
            }
                          
            </div>
        )
    }

}

export default InformationMovie
