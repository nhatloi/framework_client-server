import React ,{useState,useEffect}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { Table,Typography,message,Drawer,Modal} from 'antd';
import { EyeOutlined,DeleteOutlined,RedoOutlined} from '@ant-design/icons';
import {fetchAllUsers,dispatchGetAllUser} from '../../redux/actions/allUserAction'
import Information from './InformationUser'
const { Text} = Typography;
const initialState = {
    email:'',
    name:'',
    avatar:'',
}



function Account(props) {

    const dispatch = useDispatch()
    const updatePage = localStorage.getItem('updatePage')
    useEffect(()=>{
        fetchAllUsers(token).then(res =>{
            dispatch(dispatchGetAllUser(res))
          })
        localStorage.removeItem('updatePage')
      },[updatePage])


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
    
    const [visible, setvisible] = useState(false)
    const trans = props.trans
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)
    const [userInfor, setuserInfor] = useState(initialState)
    const [isModalVisible, setIsModalVisible] = useState(false);



    //render
    return (
        <div className='account' style={{transform:`translateX(${trans}px)`}}>
            <h2><Text underline>User Manager</Text></h2>
            <Table columns={columns} dataSource={users}
            onRow={(record, rowIndex) => {
                return {
                  onClick: event => {setuserInfor(users[rowIndex])}, // click row
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
                <Information infor ={userInfor}/>
            </Drawer>
            <Modal title="confirm deletion" visible={isModalVisible} onOk={handleOkDelete} onCancel={handleCancelDelete}>
                <p>Delete User?</p>
            </Modal>
        </div>
    )
}

export default Account
