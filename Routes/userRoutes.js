import express from "express"
import User from "../Models/userSchema.js";
import {  createUser, getUserById, updateUser, deleteUser} from "../Controllers/userController.js";

const router = express.Router();

//...../api/users.....
router.route("/")
.post(createUser) //create user

//..... /api/users/:id.....
router.route("/:id")
.get(getUserById)//get user by id
.put(updateUser)  //update user by id 
.delete(deleteUser) //delete user by id


export default router;