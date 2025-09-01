import { createRoutine } from "../models/routine_models.js";
import { editRoutine } from "../models/routine_models.js";
import { deleteRoutine } from "../models/routine_models.js";
import { getRoutineById } from "../models/routine_models.js";
import { verifUser } from "../models/user_models.js";
import { verifRoutine } from "../models/routine_models.js";
import { generateToken } from "./jwt_controllers.js";

//Create a routine
export async function createRoutineController(req, res){
    try{
        const user_id = req.user.id;
        const data = req.body;
        
        const check = await verifUser({id: user_id});
        if (!check){
            throw new Error ("User does not exist")
        }
        
        
        if (data.routine_name){
            const newRoutine = await createRoutine({user_id, data: data.routine_name});
            console.log(newRoutine)
            const token = generateToken({id: newRoutine, role: "user"})
            res.status(201).json({message: "routine created successfully", id: newRoutine, token: token});
       
        }else{
            return res.status(400).json("Unexpected field")
        }
    }catch(error){
        console.error("Erro", error.message);
    }
}

//edit a routine
export async function editRoutineController(req, res){
    try{
        const id = req.routine.id;
        const data = req.body;

        const check = await verifRoutine(id);
        if (!check){
            throw new Error ("Routine does not exist")
        }

        const allowedFields = ["routine_name", "id" ];
        const update = {};

        for (const key of allowedFields){
            if(data[key]){
                update[key] = data[key];
            }
        }
        
         const editName = await editRoutine({routine_name: update, id});
         res.status(200).json("updated routine")
         
    }catch(error){
        console.error(error);
        res.status(401).json("Unexpected field")
        
    }
}

//delete a routine
export async function deleteRoutineController(req , res){
    try{
        const id = req.routine.id;
        const {confirm} = req.body;
        const regex = /^Deletar$/;
        const check = await verifRoutine(id);

        if(!check){
            throw new Error ("routine does not exist")
        }

        if (regex.test(confirm)){
            const delRoutine = await deleteRoutine({id});
            return res.status(200).json("routine deleted")
        }else{
            return res.status(401).json("Confirmation necessary")
        }
    }catch(error){
        console.error(error.message);
    }
}


//show the routines
export async function getRoutineByIdController(req, res){
    try{
        const id = req.user.id;
        const check = await verifUser({id});
        if (!check){
            throw new Error ("User does not exist")
        }else{
            
            const mostrar = await getRoutineById({id});
            if(!mostrar){
                return res.status(404).json("not found")
            }else{
               return res.status(200).json(mostrar);

            }
        }

    }catch(error){
        console.error(error.message);
    }
} 

