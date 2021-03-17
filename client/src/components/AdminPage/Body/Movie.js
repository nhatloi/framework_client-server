import React,{useState,useEffect} from 'react'
import {Typography,Drawer,Table,Modal,message,Input} from 'antd';
import AddNewMovie from './commons/AddNewMovie'
import {useSelector} from 'react-redux'
import { EyeOutlined,DeleteOutlined,UserOutlined} from '@ant-design/icons';
import axios from 'axios'
import Information from './commons/InformationUser'

const { Text} = Typography;
const initialState = {
    original_title:'',
    overview:'',
    poster_path:'',
    backdrop_path:'',
    _id:'',
    directors:'',
    actors:'',
}

function Movie() {
    
    //const
    const [Movies, setMovies] = useState([])
    const [moviesView, setmoviesViewView] = useState([])
    const [movieinfor, setmovieinfor] = useState(initialState)
    const [visible, setvisible] = useState(false)
    const token = useSelector(state => state.token)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleEdit =() =>{
        setvisible (!visible)
    }

    const columns = [
        {
          title: '_Id',
          dataIndex: '_id',
        },
        {
          title: 'Name',
          dataIndex: 'title',
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () =>
                <div>
                     <EyeOutlined onClick={handleEdit} />&nbsp;&nbsp;&nbsp;&nbsp;<DeleteOutlined onClick={Deletehandle}/>
                </div>
          },
      ];


    useEffect(() => {
        movies_eff()
    }, [Movies])

    const movies_eff = async() =>{
        try{
            const res = await axios.get('/movie/getallmovie', {headers:{Authorization:token}})
            setMovies(res.data.movie)
            setmoviesViewView(Movies);
        }catch (error) {
            console.log(error);
        }
    }
    const Deletehandle = () =>{
        setIsModalVisible(true)
      }

    const handleOkDelete = async () => {
        try {
            await axios.delete(`/movie/delete/${movieinfor._id}`,{
                headers:{Authorization:token}
            })
            localStorage.setItem('updatePage',true)
            const hide = message.loading('Delete... ' + movieinfor.original_title, 0);
            setTimeout(hide, 2500);
            movies_eff();
        } catch (error) {
            return;
        }
        setIsModalVisible(false)
    };
    const handleCancelDelete = () => {
        setIsModalVisible(false)
    };

    const handleSearch = (e) =>{
        const str = e.target.value;
        var count=[];
        Movies.forEach(element => {
            if(element.title.toLowerCase().search(str) != -1){
                count.push(element);
            }
        });
        if(count==0)
            setmoviesViewView(Movies);
            if(count!=0) {
                setmoviesViewView(count);
            }
      }




    return (
        <div className='admin-movies'>
           <h2><Text underline>Movies Manager</Text></h2>
           <div style={{width:"300px",float:'right',display:'flex'}}>
              <Input size="large" placeholder="Search" prefix={<UserOutlined />} onChange={handleSearch}/>
            </div>
           <Table columns={columns} dataSource={moviesView}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {setmovieinfor(moviesView[rowIndex])}, // click row
                    onContextMenu: event => {}, // right button click row
                };
              }}
            />
           <Drawer
                width={'50%'}
                title="Information"
                placement="right"
                visible={visible}
                onClose={handleEdit}
                >
                <Information movie infor ={movieinfor}/>
            </Drawer>
            <Modal title="confirm deletion" visible={isModalVisible} onOk={handleOkDelete} onCancel={handleCancelDelete} >
                <p>Delete Movie?</p>
            </Modal>

        </div>
    )
}

export default Movie