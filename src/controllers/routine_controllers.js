import { createRoutine } from "../models/routine_models.js";
import { editRoutine } from "../models/routine_models.js";
import { deleteRoutine } from "../models/routine_models.js";
import { getRoutineById } from "../models/routine_models.js";
import { verifUser } from "../models/user_models.js";
import { verifRoutine } from "../models/routine_models.js";

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
            res.status(201).json({message: "routine created successfully", id: newRoutine });
       
        }else{
            return res.status(400).json("Unexpected field")
        }
    }catch(error){
        console.error("Erro", error.message);
        res.status(500).json({message: "error creating the routine"})
    }
}

//edit a routine
export async function editRoutineController(req, res){
    try{
        const id = req.user.id;
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
         res.status(200).json({message: "updated routine"})
         
    }catch(error){
        console.error("Deu ruim, mano: ", error.message);
        res.status(400).json({message: "did not updtate"})
    }
}

//delete a routine
export async function deleteRoutineController(req , res){
    try{
        const id = req.user.id;
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
        console.error("Deu erro mano: ", error.message);
        res.status(400).json({message: "failed to delete"})
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
        res.status(500).json({message: "Error fetching routine."});
    }
} 

