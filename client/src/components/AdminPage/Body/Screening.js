import React,{useState,useEffect} from 'react'
import {Drawer,Typography,Table,Modal,message,Input,Form,Button, InputNumber,Select} from 'antd';
import {useSelector} from 'react-redux'
import { SettingOutlined,DeleteOutlined,UserOutlined} from '@ant-design/icons';
import axios from 'axios'
const { Option } = Select;

const { Text} = Typography;

function Screening() {

     //const
     const [Room, setRoom] = useState([])
     const [results, setresults] = useState([])
     const [Movies, setMovies] = useState([])
     const [theater, settheater] = useState([])
     const token = useSelector(state => state.token)
     const [view, setview] = useState([])
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [searching, setsearching] = useState(0)
     const [viewinfor, setviewinfor] = useState()
     const [visible, setvisible] = useState(false)
     const [addnew, setaddnew] = useState(false)

     const handleEdit =() =>{
        setvisible (!visible)
            if(visible) setaddnew(false)

    }


    const columns = [

        {
            title: 'Total Seats',
            dataIndex: 'theater_RoomId',
            render: result =><div>{result.matrix_chair[0] *result.matrix_chair[1] }</div>
          },

        {
          title: 'Seats rest',
          dataIndex: 'seats',
        },

        {
            title: 'Theater',
            children: [
              {
                title: 'Room index',
                dataIndex: 'theater_RoomId',
                key: 'theater_RoomId',
                render: result =><div>{result.index}</div>
              },
              {
                title: 'Theater',
                dataIndex: 'theater_RoomId',
                render: result =><div>{result.theaterId.name}</div>
              },
            ],
          },

          {
            title: 'Start',
            dataIndex: 'time_start',
          },
        
        {
            title: 'Movie',
            dataIndex: 'MovieId',
            render: result =><div>{result.title}</div>
          },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () =>
                <div>
                    <DeleteOutlined onClick={Deletehandle}/> <SettingOutlined id="setting" onClick={handleEdit}/>
                </div>
          },
      ];

      useEffect(() => {
        Screening_eff()
        theater_eff()
        movies_eff()
    }, [])

    const theaterRoom_eff = async(e) =>{
        try{
            const res = await axios.post('/theater/theater_room/searchRoom',{theaterId:e},{headers:{Authorization:token}})
            setRoom(res.data.theater_room)
        }catch (error) {
            console.log(error);
        }
    }

    const movies_eff = async() =>{
        try{
            const res = await axios.get('/movie/getallmovie')
            setMovies(res.data.movie)
        }catch (error) {
            console.log(error);
        }
    }

    const Screening_eff = async() =>{
        try{
            const res = await axios.get('/theater/screening/get_allscreening',{headers:{Authorization:token}})
            setresults(res.data.screenings)
        }catch (error) {
            console.log(error);
        }
    }

    const theater_eff = async() =>{
        try{
            const res = await axios.get('/theater/get_alltheater',{headers:{Authorization:token}})
            settheater(res.data.theater)
        }catch (error) {
            console.log(error);
        }
    }


    const handleSearch = (e) =>{
        const str = e.target.value;
        if(str==="")
            setsearching(0)
        else setsearching(1)
        var count=[];
        results.forEach(element => {
            if(element.MovieId.title.toLowerCase().search(str) != -1
            ||element.theater_RoomId.index === parseInt(str)
            ||element.theater_RoomId.theaterId.name.toLowerCase().search(str) != -1
            ){
                count.push(element);
            }
        });
        setview(count);
      }

      const handlechangeTheater = (e) =>{

        theaterRoom_eff(e)
      }


      const Settinghandle = async (e) =>{
            if(addnew)
            try {

                const res = await axios.post(`/theater/theater_room/addtheater_room`,{theaterId:e.theater,index:e.index,matrix_chair:[e.height,e.width]},
                {headers:{Authorization:token}
                })
                message.success(res.data.msg)
                localStorage.setItem('updatePage',true)
                Screening_eff();
                
            } catch (error) {
                message.warning("not add")
            }
            else
            try {

                const res = await axios.post(`/theater/theater_room/updatetheater_room`,{id:viewinfor._id,theaterId:e.theater,index:e.index,matrix_chair:[e.height,e.width]},
                {headers:{Authorization:token}
                })

                message.success(res.data.msg)
                localStorage.setItem('updatePage',true)
                Screening_eff();
            } catch (error) {
                message.warning("not update")
            }

      }


      const handleAdd= async (e) =>{
        try {
            setaddnew(true)
            handleEdit()
        } catch (error) {
            return;
        }


  }

    const Deletehandle = () =>{
        setIsModalVisible(true)
      }

    const handleOkDelete = async () => {
        try {
            await axios.delete(`/theater/theater_room/deletetheater_room/${viewinfor._id}`,{
                headers:{Authorization:token}
            })
            localStorage.setItem('updatePage',true)
            const hide = message.loading('Delete... ' + viewinfor.name, 0);
            setTimeout(hide, 2500);
            Screening_eff();
        } catch (error) {
            return;
        }
        setIsModalVisible(false)
    };
    const handleCancelDelete = () => {
        setIsModalVisible(false)
    };



    return (
        <div>
            <div className='body-container'>
                <h2><Text underline>Screening Manager</Text></h2>
                    <Button style={{width:"10%",float:'left'}} size="large" onClick={handleAdd}>Add</Button>
                    <Input style={{width:"30%",float:'right'}} size="large" placeholder="Search" prefix={<UserOutlined />} onChange={handleSearch}/>
                <Table columns={columns} scroll={{ y: 450 }} pagination={{ pageSize: results.length }} dataSource={searching==0?results:view}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {setviewinfor(searching==0?results[rowIndex]:view[rowIndex])}, // click row
                            onContextMenu: event => {}, // right button click row
                        };
                    }}
                    />

                    {/* information */}
                    <Modal title="confirm deletion" visible={isModalVisible} onOk={handleOkDelete} onCancel={handleCancelDelete} >
                        <p>Delete Theater?</p>
                    </Modal>

                    <Drawer
                    width={'30%'}
                    title="Information"
                    placement="right"
                    visible={visible}
                    onClose={handleEdit}
                    >
                        <Form  onFinish={Settinghandle}>
                        <Form.Item
                            label="Theater"
                            name="theater"
                            rules={[{ required: true, message: 'Please input Theater!' }]}
                        >
                            <Select onChange={handlechangeTheater}>
                                {theater.map(item => (
                                    <Option key={item._id}>{item.name}</Option>
                                    ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Room"
                            name="room"
                            rules={[{ required: true, message: 'Please input Theater!' }]}
                        >
                            <Select disabled={Room.length==0?true:false} defaultValue={0}>
                                {Room.map(item => (
                                    <Option key={item.index}>{item.index}</Option>
                                    ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Movie"
                            name="movie"
                            rules={[{ required: true, message: 'Please input Theater!' }]}
                        >
                            <Select>
                                {Movies.map(item => (
                                    <Option key={item.title}>{item.title}</Option>
                                    ))}
                            </Select>
                        </Form.Item>

                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form>
                </Drawer>
            </div>
        </div>
    )
}

export default Screening


