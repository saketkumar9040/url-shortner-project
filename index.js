const express =require('express');
const dbConnection=require("./config/db");
const router=require('./routes/Route')


const app = express();

//  DATABASE CONNECTION
dbConnection();

app.use(express.json());

// ROUTING
app.use('/',router)

const PORT=3000;

app.listen(PORT,()=>console.log(`server running on ${PORT}`));