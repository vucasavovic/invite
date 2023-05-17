const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./config');
const PORT = process.env.PORT || 3000;
const {onError} = require('./error/errorHandler');
const defaultRoutes = require('./route/default')
const invitationRoutes = require('./route/invitation');
const userRoutes = require('./route/user');
const app = express();
app.use(express.json())
//app.use(cors(config.corsOptions))

app.set('views', path.join(__dirname,'/views'))
app.set('view engine','ejs')
 
app.use(cookieParser())
 
app.use('/static',express.static(path.join(__dirname,'../client/public')))

app.use('/',defaultRoutes)
app.use('/api/invitation',invitationRoutes)
app.use('/api/user',userRoutes)

app.use(onError)

app.listen(PORT,()=>{console.log(`Listening on: http://localhost:${PORT}`)})