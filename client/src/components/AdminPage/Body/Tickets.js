import React,{useState,useEffect} from 'react'
import {Typography,Table,Input} from 'antd';
import {useSelector} from 'react-redux'
import {UserOutlined} from '@ant-design/icons';
import axios from 'axios'

const { Text} = Typography;

function Tickets() {

     //const
     const [results, setresults] = useState([])
     const token = useSelector(state => state.token)
     const [view, setview] = useState([])
     const [searching, setsearching] = useState(0)
    const columns = [

        {
            title: 'Customer',
            dataIndex: 'UserId',
            key:'UserId',
            render: result =><div>{result.name}</div>
          },

        {
            title: 'Location seats',
            children: [
            {
                title: 'vertical',
                dataIndex: 'number_seat',
                key: 'vertical',
                render: result =><div>{result[0]+1}</div>
            },
            {
                title: 'horizontal',
                dataIndex: 'number_seat',
                key: 'horizontal',
                render: result =><div>{result[1]+1}</div>
            },
            ],
        },

        {
            title: 'Theater',
            children: [
              {
                title: 'Room index',
                dataIndex: 'ScreeningId',
                key: 'Room_index',
                render: result =><div>{result.theater_RoomId.index}</div>
              },
              {
                title: 'Theater',
                dataIndex: 'ScreeningId',
                key:"Theater",
                render: result =><div>{result.theater_RoomId.theaterId.name}</div>
              },
            ],
          },

          {
            title: 'Start',
            dataIndex: 'ScreeningId',
            key:'start',
            render: result =><div>{result.time_start}</div>
          },
        
        {
            title: 'Movie',
            dataIndex: 'ScreeningId',
            key:'movie',
            render: result =><div>{result.MovieId.title}</div>
          },
      ];

      useEffect(() => {
          Ticket_eff()
    }, [])

    const Ticket_eff = async(e) =>{
        try{
            const res = await axios.get('/theater/ticket/get_allticket',{headers:{Authorization:token}})
            setresults(res.data.Ticket)
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
            if(element.UserId.name.toLowerCase().search(str) != -1
            ||element.ScreeningId.MovieId.title.toLowerCase().search(str) != -1
            ){
                count.push(element);
            }
        });
        setview(count);
      }     


    return (
        <div>
            <div className='body-container'>
                <h2><Text underline>Tickets Manager</Text></h2>
                    <Input style={{width:"30%",float:'right'}} size="large" placeholder="Search" prefix={<UserOutlined />} onChange={handleSearch}/>
                <Table bordered={true} columns={columns} scroll={{ y: 450 }} pagination={{ pageSize: results.length }} dataSource={searching==0?results:view}
                    />
            </div>
        </div>
    )
}

export default Tickets
