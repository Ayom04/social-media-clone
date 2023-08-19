require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT
const cors = require('cors');

const {notFoundMessage, welcomeMessage} = require('./constants/messages')

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.status(200).json({
        status: false,
        message: 'Welcome to my API'
    });
})
app.listen(PORT, ()=>{
    console.log(`Server running on port http://localhost:${PORT}`)
})
app.use((req, res)=>{
    res.status(404).json({
        status: false,
        message: notFoundMessage
    })
});
