const express=require('express')
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const router=express.Router();

const{addEntry,getBlogById,deleteEntry,getUserById,getEntry,getAllEntry,updateEntry,getAllBlogs}=require("../controllers/Blog");


router.param('blogID',getBlogById);
router.param('userID',getUserById);



router.post("/blog/:userID/add",isSignedIn,isAuthenticated, addEntry);
// router.get("/blog/:userID/:blogID",);
router.delete("/blog/:userID/:blogID",isSignedIn,isAuthenticated,deleteEntry);
router.get("/blog/:userID/all",isSignedIn,isAuthenticated,getAllEntry);
router.put("/blog/:userID/:blogID",isSignedIn,isAuthenticated,updateEntry);
router.get("/blogs",getAllBlogs);
module.exports=router;