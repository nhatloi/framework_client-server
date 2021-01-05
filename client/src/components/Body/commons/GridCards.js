import React from 'react'
import { IMAGE_BASE_URL } from '../../../Config';
import { Rate, Card } from 'antd';
import './GridCard.css'

const Logo = require('../../../access/images/User.png');
const { Meta } = Card;


function GridCards(props) {


    let { actor, image, movieId, movieName,voteAverage,releaseDate,characterName,movieOverview,characterC} = props
   
    const POSTER_SIZE = "w154";
    voteAverage /=2
    var numb =voteAverage*10%10;
    voteAverage = Math.ceil(voteAverage)
   if(numb>5){
    voteAverage -= 0.5
   }
    if (actor) {
        if(!image){
            return(
                <div>
                <Card className='actor'
                   cover={<img alt={characterName} style={{height:'300px'}} />}>
                   <Meta title={characterName} description={characterC} />
               </Card>
               </div>
            )
        }
        else
        return (
             <div>
                 <Card className='actor'
                    cover={<img alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />}>
                    <Meta title={characterName} description={characterC} />
                </Card>
                </div>
        )
    } else {
        return (
        <div className='movie'>
            <a href={`/movie/${movieId}`}>
                <Card className ='card'
                    cover={ <img alt ='' src={image} />}>
                    <Meta title={movieName} description={releaseDate}/>  
                    <Rate allowHalf disabled defaultValue={voteAverage} />

                    {
                            !movieOverview ? false 
                            :<div className='movie-over'>
                                <h2>Over view</h2>
                                <p>{movieOverview}</p>
                            </div>
                    }
                   
                </Card>
            </a>
        </div>
            
        )
    }

}
export default GridCards
