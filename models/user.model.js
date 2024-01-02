const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const commentSchema=require('./comment.model');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name']
    },
    email:{
        type:String,
        required:[true,'Please provide a email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide a password']
    },
    posts:[{
        type:mongoose.Schema.ObjectId,
        ref:'Post'
    }],
    comments:[{
        type:commentSchema,
        ref:'Comment'
    }]
},{timestamps:true})


UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
   
    next();
}
)
UserSchema.methods.matchPasswords=async function(password){
    return await bcrypt.compare(password,this.password);
}

module.exports=mongoose.model('User',UserSchema);