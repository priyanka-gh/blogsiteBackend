const express=require('express')
const {User,blogEntry}=require('../models/auth')

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

exports.getBlogById=(req,res,next,id)=>{
    const userid = req.profile._id;
    User.findById(userid).exec((err,user)=>{
        if(err || !user) {
            return res.status(400).json({
                error: 'No user for was found in DB'
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

// exports.getEntry=(req,res)=>{
//     return res.json([req.DataEntry.title,req.DataEntry.content]);
// }

exports.deleteEntry=(req,res)=>{
    const userId = req.profile._id
    const blogId = req.blog._id
    const filteredBogs = req.profile.blogs.filter((blog) => blog._id == blogId)
    console.log(filteredBogs)
    console.log(userId)
    console.log(blogId)
    User.findByIdAndUpdate(
        {_id : userId},
        {$set : {blogs : req.profile.blogs.filter((blog) => blog._id !== blogId)}},
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

exports.updateEntry=(req,res)=>{
    const DataEntry=req.DataEntry;
    DataEntry.title=req.body.title;
    DataEntry.content=req.body.content;
    DataEntry.save((err,updatedEntry)=>{
        if(err){
            return res.status(400).json({
                error: "couldnt update"
            })
        }
        res.json(updatedEntry);
    });
};

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