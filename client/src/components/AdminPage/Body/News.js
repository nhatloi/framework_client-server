import React,{useState,useEffect} from 'react'
import {Typography,Drawer,Table,Modal,message,Input} from 'antd';
import {useSelector} from 'react-redux'
import { EyeOutlined,DeleteOutlined,UserOutlined} from '@ant-design/icons';
import axios from 'axios'
import Information from './commons/Information'
const { Text} = Typography;
const initialState = {
    description:'',
    source:'',
    time:'',
    img:'',
}



function News() {
      //const
      const [News, setNews] = useState([])
      const [NewsView, setNewsViewView] = useState([])
      const [newsinfor, setnewsinfor] = useState(initialState)
      const [visible, setvisible] = useState(false)
      const token = useSelector(state => state.token)
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [searching, setsearching] = useState(0)
      const handleEdit =() =>{
          setvisible (!visible)
      }
  
      const columns = [
          {
            title: 'description',
            dataIndex: 'description',
          },
          {
            title: 'source',
            dataIndex: 'source',
          },
          {
            title: 'time',
            dataIndex: 'time',
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
          News_eff()
      }, [])
  
      const News_eff = async() =>{
          try{
              const res = await axios.get('/news/get_allnews', {headers:{Authorization:token}})
              console.log(res)
          }catch (error) {
              console.log(error);
          }
      }
  
      const Deletehandle = () =>{
          setIsModalVisible(true)
        }
  
      const handleOkDelete = async () => {
          try {
              await axios.delete(`/news/deletenews/${newsinfor._id}`,{
                  headers:{Authorization:token}
              })
              localStorage.setItem('updatePage',true)
              const hide = message.loading('Delete... ' + newsinfor.original_title, 0);
              setTimeout(hide, 2500);
              News_eff();
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
          if(str==="")
              setsearching(0)
          else setsearching(1)
          var count=[];
          News.forEach(element => {
              if(element.title.toLowerCase().search(str) != -1){
                  count.push(element);
              }
          });
          setNewsViewView(count);
        }


    return (
        <div className='body-container'>
            <h2><Text underline>News Manager</Text></h2>
            <div style={{width:"300px",float:'right',display:'flex'}}>
            <Input size="large" placeholder="Search" prefix={<UserOutlined />} onChange={handleSearch}/>
            </div>
            <Table columns={columns} dataSource={searching==0?News:NewsView}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {setnewsinfor(NewsView[rowIndex])}, // click row
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
                <Information news infor ={newsinfor}/>
            </Drawer>
            <Modal title="confirm deletion" visible={isModalVisible} onOk={handleOkDelete} onCancel={handleCancelDelete} >
                <p>Delete news?</p>
            </Modal>

     </div>
    )
}

export default News
