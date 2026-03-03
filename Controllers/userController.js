import User from "../Models/userSchema.js";

//Create a new user 
const createUser = async (req, res) =>{
    try{
        const { id, name, email, password, role} = req.body
    const user = await User.create({
       id,
       name,
       email,
       password,
       role 
    });
    res.status(201).json({
        message: "User created successfully",
        user
    });

    }catch (error){
        res.status(400).json({error: error.message });
    }
};

//Get user by id 

const getUserById = async (req, res) => {
try{
    const user = await User.findOne ({ id: req.params.id });
    if (!user){
        return res.status(404).json ({ error: "User noy found" });
}
res.status(200).json(user);
}catch  (error){
        res.status(400).json({ error: error.message })
    }
};

//update a user
const updateUser = async(req, res)=>{
    try{
         const updatedUser = await User.findOneAndUpdate(
             req.params.id,
             req.body,
             { new: true, runValidators: true}
             );
             if (!updatedUser){
                return res.status(404).json({ error: "user not found" })
           }

           res.status(200).json({
            message: "User updated successfully",
            updatedUser
           });
    }catch (error){
        res.status(400).json({ error: error.message})
    }
};

//deleteUser
const deleteUser = async (req, res) => {
    try{
        const deletedUser = await User.findOneAndDelete(
            req.params.id,
            req.body,
              { new: true, runValidators: true}
      );
      if(!deletedUser){
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "User deleted successfully",
        deletedUser
      });
    } catch (error){
        res.status(400).json({ error: error.message });
    }
};

export { createUser, getUserById, updateUser, deleteUser }

