require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');



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


app.use('/', (req,res) => {
    res.json({msg: 'This is Server page!!'})
});

const Port = process.env.Port || 4000
app.listen(Port, () => {
    console.log('Server is running at',Port)
});