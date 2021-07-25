const express=require('express')
const {User,blogEntry}=require('../models/auth')


//Middlewares

exports.getBlogById=(req,res,next,id)=>{
    const userid = req.profile._id;
    User.findById(userid).exec((err,user)=>{
        if(err || !user) {
            return res.status(400).json({
                error: 'No Blog was found in DB'
            })
        }
        const result = user.blogs.filter(blog => blog._id == id)
        req.blog = result[0];
        next()
    })
};

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'No user for was found in DB'
            })
        }
        req.profile = user;
        next();
    })
}

 //Add a new blog
exports.addEntry=(req,res)=>{

    const blog=req.body;
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push:{blogs:blog}},
        {new:true},
        (err,user)=>{
            if(err) {
                return res.status(400).json({
                    error: 'Unable to add blog'
                })
            }
            res.status(200).json({
                success:true,
                blog:blog,
                id:user._id
            });
        }
    )
};

//Get a particular blog from a particular user
exports.getEntry = (req,res)=>{
    return res.json(req.blog);
} 
//Get a particular blog from a particular user Home
exports.getAllEntryHome = (req,res)=>{
    blogsToSend=[]
    const userId=req.params.blogId
    ThisBlog=""
    User.find().exec((err,user)=>{
        if(user){
            user.map(user=>{
                blogsToSend=[...blogsToSend,...user.blogs]
            })
            for(let i=0;i<blogsToSend.length;i++){
                if(blogsToSend[i]._id==userId)
                {
                ThisBlog=blogsToSend[i];
                }
            }
        }
        res.status(200).json(ThisBlog);
    })
} 

// Delete a blog from a particular user's profile
exports.deleteEntry=(req,res)=>{
    const userId = req.profile._id
    const blogId = req.blog._id

    User.findByIdAndUpdate(
        {_id : userId},
        {$set : {blogs : req.profile.blogs.filter((blog) => blog._id.toString() !== blogId.toString())}},
        {new : true , useFindAndModify : false},
        (err,user) => {
            if(err || !user){
                return res.status(404).json({
                    error : "Unable to delete"
                })
            }
            res.status(200).json({
                message : "Deleted Successfully"
            })   
        }
    )
}

//Get all the blogs of a particular user
exports.getAllEntry=(req,res)=>{
    const id = req.profile._id;
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(404).json({
                error : "User not found"
            })
        }
        res.status(200).json(user.blogs)
    })
};

//Update a particular user's blog
exports.updateEntry=(req,res)=>{
    // Get UserID and BlogID from the middlewares
    const userId = req.profile._id
    const blogId = req.blog._id

    // Get the updated blog from the request body.
    const updatedBlog = req.body;
    User.findByIdAndUpdate(
        {_id : userId},
        // Update the user's blog array
        {$set : {blogs : req.profile.blogs.map(blog => blog._id.toString() === blogId.toString() ? updatedBlog : blog)}},
        {new : true , useFindAndModify : false},
        (err,user) => {
            if(err || !user){
                return res.status(404).json({
                    error : "Unable to update"
                })
            }
            res.status(200).json({
                message : "Updated Successfully"
            })   
        }
    )
};

//Get blogs of all the users
exports.getAllBlogs=(req,res)=>{
    blogsToSend=[]
    User.find().exec((err,user)=>{
        if(user){
            user.map(user=>{
                blogsToSend=[...blogsToSend,...user.blogs]
            })
        }
        res.status(200).json(blogsToSend);
    })
}