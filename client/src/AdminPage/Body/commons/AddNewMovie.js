import React ,{useState}from 'react'
import { Input } from 'antd';
import Scraper from 'images-scraper'
const { Search } = Input;
const google = new Scraper({  
} );




function AddNewMovie() {

    const handleSearch = async(props) =>{
            const results = await google.scrape('banana', 200);
            console.log('results', results);
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

            <img alt= 'poster' src={'https://cdn.moveek.com/media/cache/short/5fec17e5a280e649515214.jpg'} />
        </div>
    )
}

export default AddNewMovie
