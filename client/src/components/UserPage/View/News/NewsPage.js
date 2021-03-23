import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Newspage.css'


function NewsPage() {
    //const
    const [News, setNews] = useState([])

    //effect
    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () =>{
        try {
            const res = await axios.get('/news/get_allnews')
            return setNews(res.data.news);
        } catch (err) {
           return err.response.data.msg
        }
    }



    //render
    return (
        <div className="news_page">
            <h2>News</h2>
            {News && News.map((news, index) => (
                <div className='cast_news'>
                    <a alt="source" href={news.link}>
                    <div>
                            <h1>{news.description}</h1>
                            <label>{news.source} - {news.time}</label>
                    </div>
                    </a>
                    <img alt='' src={news.img } />
                </div>
            ))}
        </div>
    )
}

export default NewsPage
