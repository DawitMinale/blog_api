const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path');
const {config}=require("dotenv");
const helmet=require('helmet');
const morgan=require('morgan');
// error handlers
config()
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
const connectDb=require("./db/connect.js");
const authMiddleware=require('./middleware/auth-middleware.js');

const errorHandlerMiddleware=require('./middleware/error-handler.js');
const notFound=require('./middleware/not-found');





// routes
const authRoutes=require('./routes/auth.route.js');
const postRoutes=require('./routes/post.route.js');
const commentRoutes=require('./routes/comment.route.js');

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/posts',authMiddleware,postRoutes);
app.use('/api/v1/posts/',authMiddleware,commentRoutes);







app.use(notFound);

app.use(errorHandlerMiddleware);


const PORT=process.env.PORT || 5000;
app.listen(PORT,async ()=>{
    await connectDb();
    console.log(`Server started on port ${PORT}`);
});



