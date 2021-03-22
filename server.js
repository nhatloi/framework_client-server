require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path')



const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true
}));

// Router
app.use('/user',require('./Server/router/userRouter'))
app.use('/api',require('./Server/router/upload'))
app.use('/movie',require('./Server/router/moviesRouter'))
app.use('/comment', require('./Server/router/comment'));
app.use('/like', require('./Server/router/like'));
app.use('/news', require('./Server/router/NewsRouter'));
app.use('/favorite', require('./Server/router/favorite'));
app.use('/theater', require('./Server/router/TheaterRouter'));
app.use('/theater/theater_room', require('./Server/router/Theater_RoomRouter'));
app.use('/theater/screening', require('./Server/router/ScreeningRouter'));
app.use('/theater/ticket', require('./Server/router/ticketRouter'));




//connect mongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI,{

    useCreateIndex:true,
    useFindAndModify:false ,
    useNewUrlParser:true,
    useUnifiedTopology:true
}, err => {
    if(err) throw err;
    console.log('Connected mongoDB')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}


app.use('/', (req,res) => {
    res.json({msg: 'This is Server page!!'})
});

const Port = process.env.Port || 4000
app.listen(Port, () => {
    console.log('Server is running at',Port)
});