import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import moment   from 'moment';
import {Skeleton,Form,Input,List,DatePicker,InputNumber,Button,message} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios'
import './commons.css'
import ReactPlayer from 'react-player/youtube'
const { TextArea } = Input;

function InformationMovie(props) {
    const {data, custom} = props
    const token = useSelector(state => state.token)
    const [movie, setmovie] = useState()
    const dateFormat = 'YYYY/MM/DD';
    const [posterImg, setposterImg] = useState('')
    const [bannerImg, setbannerImg] = useState('')

    useEffect(() => {
        if(!custom)
            fetcMovies(data)
    }, [data])

    const fetcMovies = async(data) => {
        try {
            const res = await axios.get('/movie/fetchMovieDetailTheaters',{headers:{url:data.linkmovie}})
            setmovie(res.data.movie)
            console.log(res.data.movie)
        } catch (err) {
           return err.response.data.msg
        }
       
    }
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };

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

    const onCustom = async(e) =>{
        try{
            const movie={
                title:e.title,
                backdrop_path:bannerImg,
                directors:e.directors,
                actors:e.actors,
                original_title:e.original_title,
                overview:e.overview,
                poster_path:posterImg,
                release_date:e.release_date,
                run_time:e.run_time,
                trailer:e.trailer,
            }

            const res = await axios.post('/movie/addmovie/',{movie:movie},
                {headers:{Authorization:token}
            })
            //message.success(res.data.msg)

            console.log(movie)
            console.log(res.data.msg)

        }catch (error) {
            message.error('add failed!');
        }
    }
      
    const upImage = async(e) =>{
        e.preventDefault();
        try {
            const file = e.target.files[0]
           if(!file) return console.error('No files were uploaded.');
           if(file.type !== 'image/jpeg' && file.type !== 'image/png') return console.error('file format incorrect.');

           let formData = new FormData()
           formData.append('file',file)
           const res = await axios.post('/api/uploadimg',formData,{
               headers:{'content-type':'multipart/form-data',Authorization:token}
           })

           if(e.target.id=="poster"){
                setposterImg(res.data.url)
           }
           if(e.target.id=="banner"){
                setbannerImg(res.data.url)
          }

        } catch (error) {
            console.error(error);
        }
    }


    if(custom)
    {
        return (
            <div>
                     <Form
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onCustom}
                        initialValues={{
                            ['run-time']: 1,
                            ['original_title']:"",
                            ['title']:"",
                            ['overview']:"",
                            ['release_date']:"",
                            ['backdrop_path']:"",
                            ['directors']:"",
                            ['actors']:"",
                            ['trailer']:"",
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
                            <Form.Item name="run_time" noStyle>
                            <InputNumber min={1}/>
                            </Form.Item>
                            <span className="ant-form-text"> Minutes</span>
                        </Form.Item>
                        <Form.List
                                name="actors"
                                rules={[
                                {
                                    validator: async (_, actors) => {
                                    if (!actors || actors.length < 1) {
                                        return Promise.reject(new Error('At least 1 actors'));
                                    }
                                    },
                                },
                                ]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                    <Form.Item
                                        {...formItemLayoutWithOutLabel}
                                        label='Actors'
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input Actors name or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                        >
                                        <Input placeholder="Actors name" style={{ width: '60%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                        ) : null}
                                    </Form.Item>
                                    ))}
                                    <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '60%' }}
                                        icon={<PlusOutlined />}
                                    >
                                        Add Actors
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                                )}
                            </Form.List>

                            <Form.List
                                name="directors"
                                rules={[
                                {
                                    validator: async (_, directors) => {
                                    if (!directors || directors.length < 1) {
                                        return Promise.reject(new Error('At least 1 directors'));
                                    }
                                    },
                                },
                                ]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                    <Form.Item
                                        {...formItemLayoutWithOutLabel}
                                        label='Directors'
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input Actors name or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                        >
                                        <Input placeholder="directors name" style={{ width: '60%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                        ) : null}
                                    </Form.Item>
                                    ))}
                                    <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '60%' }}
                                        icon={<PlusOutlined />}
                                    >
                                        Add Directors
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                                )}
                            </Form.List>


                        <Form.Item name="overview" label="Overview">
                            <TextArea rows={4} />
                        </Form.Item>
                            <Form.Item
                                name="poster_path"
                                label="Poster"
                            >
                                <img style={{height:"300px"}} alt="poster" src={posterImg}/>
                                <Input type='file' id='poster' onChange={upImage}/>
                            
                            </Form.Item>
                        <Form.Item
                                name="trailer"
                                label="Trailer"
                            >
                                <Input/>
                            </Form.Item>


                        <Form.Item label="Backdrop" name='backdrop_path'>
                            <img style={{width:"100%"}} alt="banner" src={bannerImg}/>
                            <input type='file' id='banner' onChange={upImage}/>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                        </Form>


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
                            ['run_time']: movie.runtime?movie.runtime:1,
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
                            <Form.Item name="run_time" noStyle>
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
                            </Form.Item>
                        <Form.Item
                                name="trailer"
                                label="Trailer"
                            >
                                <ReactPlayer width="100%" height="100%" url={movie.trailer} />
                            </Form.Item>


                        <Form.Item label="Backdrop" name='backdrop_path'>
                            <img alt='' src = {movie.backdrop_path?movie.backdrop_path:null} style={{width:'100%'}}/>
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

// }

export default InformationMovie
