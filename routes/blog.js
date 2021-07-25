const express=require('express')
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const router=express.Router();

const{addEntry,getBlogById,deleteEntry,getUserById,getEntry,getAllEntry,updateEntry,getAllBlogs,getAllEntryHome}=require("../controllers/Blog");


router.param('blogID',getBlogById);
router.param('userID',getUserById);


 //Add a new blog
router.post("/blog/:userID/add",isSignedIn,isAuthenticated, addEntry);

//Delete a blog from a particular user's profile
router.delete("/blog/:userID/:blogID",isSignedIn,isAuthenticated,deleteEntry); 

//Get all the blogs of a particular user
router.get("/blog/:userID/all",isSignedIn,isAuthenticated,getAllEntry);

//Get a particular blog from a particular user
router.get("/blogs/:userID/:blogID",getEntry);

//Update a particular user's blog
router.put("/blog/:userID/:blogID",isSignedIn,isAuthenticated,updateEntry);

//Get blogs of all the users
router.get("/blogs",getAllBlogs); //done get all blogs

//Get a particular blog from a particular user homepage
router.get("/blogs/:blogId",getAllEntryHome)


module.exports=router;