import React ,{useState,useEffect}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { Table,Typography,message,Drawer,Modal,Input,Button } from 'antd';
import { EyeOutlined,DeleteOutlined,UserOutlined,SearchOutlined} from '@ant-design/icons';
import {fetchAllUsers,dispatchGetAllUser} from '../../../redux/actions/allUserAction'
import Information from './commons/InformationUser'
const { Text} = Typography;
const initialState = {
    email:'',
    name:'',
    avatar:'',
}

function Account() {

    
    const dispatch = useDispatch()
        
    const [visible, setvisible] = useState(false)
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)
    const [userView, setuserView] = useState(users)
    const [userInfor, setuserInfor] = useState(initialState)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searching, setsearching] = useState(0)
     //const 
     const columns = [
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Name',
          dataIndex: 'name',
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
    
      const handleSearch = (e) =>{
        if(e.target.value==='')
            setsearching(0)
        else setsearching(1)
        var count=[];
        users.forEach(element => {
            if(element.name.toLowerCase().search(e.target.value) != -1 || element.email.toLowerCase().search(e.target.value) != -1){
                count.push(element);
            }
        });
        setuserView(count)
      }

      const Deletehandle = () =>{
        setIsModalVisible(true)
      }

    const handleOkDelete = async () => {
        try {
            await axios.delete(`/user/delete/${userInfor._id}`,{
                headers:{Authorization:token}
            })
            localStorage.setItem('updatePage',true)
            const hide = message.loading('Delete... ' + userInfor.name, 0);
            setTimeout(hide, 2500);
        } catch (error) {
            return;
        }
        setIsModalVisible(false)
    };
    const handleCancelDelete = () => {
        setIsModalVisible(false)
    };

    const handleEdit =() =>{
        setvisible (!visible)
    }



    useEffect(()=>{
        fetchAllUsers(token).then(res =>{
            dispatch(dispatchGetAllUser(res))
          })
      },[dispatch,token])
      

    //render
    return (
        <div className='account' >
            <h2><Text underline>User Manager</Text></h2>
            <div style={{width:"300px",float:'right',display:'flex'}}>
              <Input size="large" placeholder="Search" prefix={<UserOutlined />} onChange={handleSearch}/>
            </div>
            <Table columns={columns} dataSource={searching==0?users:userView}
            onRow={(record, rowIndex) => {
                return {
                  onClick: event => {setuserInfor(userView[rowIndex])}, // click row
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
                <Information account infor ={userInfor}/>
            </Drawer>
            <Modal title="confirm deletion" visible={isModalVisible} onOk={handleOkDelete} onCancel={handleCancelDelete}>
                <p>Delete User?</p>
            </Modal>
        </div>
    )
}

export default Account
