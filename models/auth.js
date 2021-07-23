var mongoose=require("mongoose"); 
const crypto=require('crypto')
const { v4: uuidv4 } = require('uuid');

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }

},{timestamps:true})

const blogEntry=mongoose.model("Blog",blogSchema)

const userSchema = new mongoose.Schema({
blogs:[blogSchema],
  name:{
      type: String,
      required: true,
      maxlength: 32,
      trim: true
  },
  email: {
      type: String,
      trim: true,
      required: true,
      unique: true
  },
  userinfo: {
      type: String,
      trim: true
  },
  encry_password: {
      type: String,
      required:true
  },
  salt: String,

},
{timestamps: true}
);

userSchema.virtual("password")
.set(function(password){
    this._password=password
    this.salt=uuidv4();
    this.encry_password=this.securePassword(password);
})
.get(function(){
    return this._password
})

userSchema.methods={

    authenticate: function(plainPassword){
        return this.securePassword(plainPassword)==this.encry_password
    },

    securePassword: function(plainPassword){
        if (!plainPassword) return "";
        try{
            return crypto.createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex');
        }catch(err){
            return "";
        }
    }
}

const User=mongoose.model("User", userSchema);
module.exports={blogEntry,User}