import React,{useState,useEffect} from 'react'
import {Drawer,Typography,Table,Modal,message,Input,Form,Button} from 'antd';
import {useSelector} from 'react-redux'
import { SettingOutlined,DeleteOutlined,UserOutlined} from '@ant-design/icons';
import axios from 'axios'

const { Text} = Typography;
const initialState ={
    id:'',
    name:'',
    address:'',
}

function Theater_room() {

     //const
     const [results, setresults] = useState([])
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
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Address',
          dataIndex: 'address',
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
    }, [])

    const theaterRoom_eff = async() =>{
        try{
            const res = await axios.get('/theater/get_alltheater',{headers:{Authorization:token}})
            setresults(res.data.theater)
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
            if(element.name.toLowerCase().search(str) != -1){
                count.push(element);
            }
        });
        setview(count);
      }


      const Settinghandle = async (e) =>{
            if(addnew)
            try {
                await axios.post(`/theater/addtheater`,{name:e.name,address:e.address},
                {headers:{Authorization:token}
                })
                localStorage.setItem('updatePage',true)
                theaterRoom_eff();
                
            } catch (error) {
                return;
            }
            else
            try {

                await axios.post(`/theater/updatetheater`,{id:viewinfor._id,name:e.name,address:e.address},
                {headers:{Authorization:token}
                })
                localStorage.setItem('updatePage',true)
                theaterRoom_eff();
            } catch (error) {
                return;
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
            await axios.delete(`/theater/deletetheater/${viewinfor._id}`,{
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
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input theater name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input theater address!' }]}
                        >
                            <Input />
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
