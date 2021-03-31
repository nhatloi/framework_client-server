import React,{useState,useEffect}from 'react'
import ReactPlayer from 'react-player/youtube'
import axios from 'axios'
import {useSelector} from 'react-redux'
import './MovieDetail.css'
import {
    PlayCircleOutlined,
    LikeOutlined,
    DislikeOutlined
  } from '@ant-design/icons';
import { Button,Comment, Avatar,Form, List, Input,Rate } from 'antd'
const { TextArea } = Input;

function MovieDetail(props) {

    //const
    const id = props.match.params.id
    const [movie, setmovie] = useState([])
    const auth = useSelector(state => state.auth)

    const CommentList = ({ comments }) => (
        <List
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout="horizontal"
          renderItem={props => <Comment {...props} />}
        />
      );
      
      const Editor = ({ onChange, onSubmit, submitting, value }) => (
        <>
          <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
              Add Comment
            </Button>
          </Form.Item>
        </>
      );

    const ExampleComment = ({ children }) => (
        <Comment
          actions={[<span key="comment-nested-reply-to">Reply to</span>]}
          author={<a>Han Solo</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <p>
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure).
            </p>
          }
        >
          {children}
        </Comment>
      );

    useEffect(() => {
        fetchData();
    },[])

    
    const fetchData = async () =>{
        try {
            const res = await axios.get(`/movie/getmoviebyid/${id}`)
            setmovie(res.data)
            
        } catch (err) {
           return;
        }
    }
    return (
        <div>
            <div className="movie-detail">
            <div class="text">
                <p style={{marginTop:"5%"}}><h1 style={{color:'red'}}>{movie.original_title}</h1><p/>
                Actors : 
                {movie.actors && movie.actors.map((item, index) => (
                    index==0?`"${item}"`:` , "${item}"`
                                            ))}
                <p/>
                Directors : 
                {movie.directors && movie.directors.map((item, index) => (
                    index==0?`"${item}"`:` , "${item}"`
                                            ))}
                <p/>
                {movie.overview}<p/>
                <Button>Add Your Rate</Button>: <Rate allowHalf disabled defaultValue={2.5} /><p/>
                <Button>Like<LikeOutlined /></Button><p/>
                {/* <DislikeOutlined /> */}
                <a href="#trailer"><PlayCircleOutlined/> View Trailer</a><p/>
                <a href={`/bookticket/${id}`}>Book tickets</a>
                </p>
                <img style={{height:"500px",width:"300px",opacity:'1',float:'right'}} src={movie.poster_path}/>
            </div>
                <img src={movie.backdrop_path}/>
               
             <div className='poster'>
            </div>
            </div>
            <div id='trailer' className="detail-trailer">
                <ReactPlayer url={movie.trailer}
                height='100%'
                width='100%' 
                playIcon
                controls={true}  
                />
            </div>
            <div id='comment' className="detail-comment">
                <div>
                    this is comment movie
                    <ExampleComment>
                        <ExampleComment>
                        <ExampleComment />
                        <ExampleComment />
                        </ExampleComment>
                    </ExampleComment>
                    <Comment
          avatar={auth.user?
            <Avatar
              src={auth.user.avatar}
              alt={auth.user.name}
            />:null
          }
          content={
            <Editor
            />
          }
        />
                </div>
                
            </div>
        </div>
    )
}

export default MovieDetail
