import {createUser} from "../models/user_models.js";
import {getUserById} from "../models/user_models.js";
import { createDataUser } from "../models/user_models.js";
import { editDataUser } from "../models/user_models.js";
import { deleteUser } from "../models/user_models.js";
import { getRoutineById } from "../models/user_models.js";
import { getLoginByPassword } from "../models/user_models.js";


//create a user
export async function createUserController(req, res){
    try{
        const {name, email, password } = req.body;
        const newUser = await createUser({name, email, password});
        res.status(201).json({message: "User created successfully!", id: newUser});
         
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Error creating user."});
    }

}

//create user data
export async function createDataUserController(req, res){
    try{
        const user_id = req.params.id;
        const { sex, age, weight, target_weight, height, level_physical_activity} = req.body;
        const newData = await createDataUser({ user_id ,sex, age, weight, target_weight, height, level_physical_activity});
        res.status(201).json({message: "User data created successfully!", id: newData});
    } catch(error){
        console.error(error.message);
        res.status(500).json({message: "Error creating user data."});
    }
}

//show the user
export async function getUserByIdController(req, res){
    try{
        const id = req.params.id;
        const user = await getUserById({id});
        res.status(200).json(user)
        return user
    } catch(error){
        console.error(error.message);
        res.status(404).json({message: "User does not exist."})
    }
}

//update an information
export async function editDataUserController(req, res){
    try{
        const id = req.params.id;
        const data = req.body;
        const editUser = await editDataUser({data,id});
        res.status(200).json({message: "Data updated successfully!"})
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Something went wrong."})
    }
}

//delete a user
export async function deleteUserController(req, res){
    try{
        const id_login = req.params.id;
        const deletar = await deleteUser({id_login});
        res.status(200).json({message: "User deleted successfully!"})
    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Could not delete user."})
    }
}

//show the routines
export async function getRoutineByIdController(req, res){
    try{
        const id = req.params.id;
        const mostrar = await getRoutineById({id});
        res.status(200).json(mostrar)
        return mostrar;
    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Error fetching routine."});
    }
} 

//check login
export async function getLoginByPasswordController(req, res){
    try{
        const {email, password} = req.body;

        const getLogin = await getLoginByPassword ({email, password}); 
        
        res.status(200).json(getLogin);
    }catch(error){
        res.status(400).json({message: "Invalid login credentials."});
        console.error(error.message);
    }
}
