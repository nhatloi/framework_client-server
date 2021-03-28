import React,{useState,useEffect} from 'react'
import {Drawer,Typography,Table,Modal,message,Input,Form,Button, InputNumber,Select} from 'antd';
import {useSelector} from 'react-redux'
import { SettingOutlined,DeleteOutlined,UserOutlined} from '@ant-design/icons';
import axios from 'axios'
const { Option } = Select;

const { Text} = Typography;
const initialState ={
    id:'',
    name:'',
    address:'',
}

function Theater_room() {

     //const
     const [results, setresults] = useState([])
     const [theater, settheater] = useState([])
     const token = useSelector(state => state.token)
     const [view, setview] = useState([])
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [searching, setsearching] = useState(0)
     const [viewinfor, setviewinfor] = useState(initialState)
     const [visible, setvisible] = useState(false)
     const [addnew, setaddnew] = useState(false)

     const handleEdit =() =>{
        setvisible (!visible)
            if(visible) setaddnew(false)

    }


    const columns = [
        {
          title: 'Index',
          dataIndex: 'index',

          
        },

        {
            title: 'Theater',
            children: [
              {
                title: 'theater Name',
                dataIndex: 'theaterId',
                key: 'theaterId',
                render: result =><div>{result.name}</div>
              },
              {
                title: 'theater Address',
                dataIndex: 'theaterId',
                key: 'theaterAddress',
                render: result =><div>{result.address}</div>
              },
            ],
          },

        {
            title: 'matrix_chair',
            dataIndex: 'matrix_chair',
            key:"matrix_chair",
            render: result =><div>{result[0]*result[1]}</div>
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
        theaterRoom_eff()
        theater_eff()
    }, [])

    const theaterRoom_eff = async() =>{
        try{
            const res = await axios.get('/theater/theater_room/getinfor_allroom',{headers:{Authorization:token}})
            setresults(res.data.theater_room)
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
            if(element.theaterId.name.toLowerCase().search(str) != -1
            || element.theaterId.address.toLowerCase().search(str) != -1
            || element.index === parseInt(str)
            ){
                count.push(element);
            }
        });
        setview(count);
      }


      const Settinghandle = async (e) =>{
            if(addnew)
            try {

                const res = await axios.post(`/theater/theater_room/addtheater_room`,{theaterId:e.theater,index:e.index,matrix_chair:[e.height,e.width]},
                {headers:{Authorization:token}
                })
                message.success(res.data.msg)
                localStorage.setItem('updatePage',true)
                theaterRoom_eff();
                
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
                theaterRoom_eff();
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
            theaterRoom_eff();
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
                <h2><Text underline>Theaters Manager</Text></h2>
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
                            label="Index"
                            name="index"
                            rules={[{ required: true, message: 'Please input Index!' }]}
                        >
                            <InputNumber min={1}/>
                        </Form.Item>
                            <Form.Item
                                label="width Chair"
                                name="width">
                                <InputNumber min={1}/>
                            </Form.Item>

                            <Form.Item
                                label="height Chair"
                                name="height">
                                <InputNumber min={1}/>
                            </Form.Item>

                        <Form.Item
                            label="Theater"
                            name="theater"
                            rules={[{ required: true, message: 'Please input theater!' }]}
                        >
                            <Select
                                placeholder="Select a option and change input text above"
                                allowClear
                            >
                                {theater.map(item => (
                                    <Option key={item._id}>{item.name}</Option>
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

export default Theater_room
