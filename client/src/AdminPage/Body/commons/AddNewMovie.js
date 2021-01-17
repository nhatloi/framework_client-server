import React ,{useState}from 'react'
import { Input } from 'antd';
const { Search } = Input;
const search = require('youtube-search');
var opts = {
    maxResults: 10,
    key: 'AIzaSyDI_zPC4aEbkvVm03X2qtHoZL03XipKxTs'
  };



function AddNewMovie() {
    

    const handleSearch = async(props) =>{
        // search(`${props}`, opts, function(err, results) {
        //     if(err) return console.log(err);
           
        //     console.log(results);
        //   });
        
        console.log(props)
    }

    const [postterImg, setpostterImg] = useState('')
    return (
        <div className= 'AddNewMovie'>
            <Search
                placeholder="Name Movie"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                />

            <img alt= 'poster' />
        </div>
    )
}

export default AddNewMovie
