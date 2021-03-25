import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import moment from 'moment';
import {Skeleton,Form,Input,List,DatePicker,InputNumber,Button,message} from 'antd';
import axios from 'axios'
import './commons.css'
import ReactPlayer from 'react-player/youtube'
const { TextArea } = Input;

function InformationMovie(props) {
    const {data,soureFetch} = props
    const token = useSelector(state => state.token)
    const [movie, setmovie] = useState()
    const dateFormat = 'YYYY/MM/DD';

    useEffect(() => {
        if(soureFetch === 'themoviedb') fetcMoviesThemoviedb(data)
        if(soureFetch === 'moveek') fetcMoviesThemoviedb(data)

    }, [data])


    const fetcMoviesThemoviedb = async(data) => {
        try {
            const res = await axios.post('/movie/themoviedbdetail',{id:data})
            setmovie(res.data.movie)
        } catch (err) {
           return err.response.data.msg
        }
       
    }

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
    
    const onFinish = async(e) =>{
        try{
            const res = await axios.post('/movie/addmovie/',{movie:e},
                {headers:{Authorization:token}
            })
            message.success(res.data.msg)
        }catch (error) {
            message.error('add failed!');
        }
    }

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
            {movie?
                <div>
                     <Form
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onFinish}
                        initialValues={{
                            ['run-time']: movie.runtime?movie.runtime:1,
                            ['original_title']:movie.original_title,
                            ['title']:movie.title,
                            ['overview']:movie.overview,
                            ['release_date']:moment(movie.release_date,dateFormat),
                            ['backdrop_path']:movie.backdrop_path,
                            ['poster_path']:movie.poster_path,
                            ['directors']:movie.directors,
                            ['actors']:movie.actors,
                            ['trailer']:movie.trailer,
                        }}
                        >
                        <Form.Item label="Title" name='title'>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="original title" name='original_title'>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="release date" name='release_date'>
                            <DatePicker format={dateFormat}/>
                        </Form.Item>
                        <Form.Item label="Run Time">
                            <Form.Item name="run-time" noStyle>
                            <InputNumber min={1}/>
                            </Form.Item>
                            <span className="ant-form-text"> Minutes</span>
                        </Form.Item>
                        <Form.Item name="directors" label="Directors">
                            <List style={{overflow:'auto',height:'100px'}}
                            size="small"
                            bordered
                            dataSource={movie.directors}
                            renderItem={item => <List.Item>{item}</List.Item>}
                            />
                            
                        </Form.Item>
                        <Form.Item name="actors" label="Actors">
                            <List style={{overflow:'auto',height:'100px'}}
                                size="small"
                                bordered
                                dataSource={movie.actors}
                                renderItem={item => <List.Item>{item}</List.Item>}
                                />
                        </Form.Item>
                        <Form.Item name="overview" label="Overview">
                            <TextArea rows={4} />
                        </Form.Item>
                            <Form.Item
                                name="poster_path"
                                label="Poster"
                            >
                                <img alt='' src = {movie.poster_path?movie.poster_path:null} style={{height:'300px'}}/>
                                <input type='file' name='file' id='file_up'/>
                            </Form.Item>
                        <Form.Item
                                name="trailer"
                                label="Trailer"
                            >
                                <ReactPlayer width="100%" height="100%" url={movie.trailer} />
                            </Form.Item>


                        <Form.Item label="Backdrop" name='backdrop_path'>
                            <img alt='' src = {movie.backdrop_path?movie.backdrop_path:null} style={{width:'100%'}}/>
                            <input type='file' name='file' id='file_up'/>
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
