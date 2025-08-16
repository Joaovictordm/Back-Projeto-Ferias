import { createRoutine } from "../models/routine_models.js";
import { editRoutine } from "../models/routine_models.js";
import { deleteRoutine } from "../models/routine_models.js";
import { getExerciseById } from "../models/routine_models.js";
import { verifUser } from "../models/user_models.js";
import { verifRoutine } from "../models/routine_models.js";

//Create a routine
export async function createRoutineController(req, res){
    try{
        const user_id = req.params.id;
        const data = req.body;
        
        delete data.id;
        delete data.user_id;

        const check = await verifUser({id: user_id});
        if (!check){
            throw new Error ("User does not exist")
        }
        
        
        if (data.routine_name){
            const newRoutine = await createRoutine({user_id, data});
            res.status(201).json({message: "routine created successfully", id: newRoutine });
       
        }else{throw new Error("Unexpected field")}
    }catch(error){
        console.error("Erro", error.message);
        res.status(500).json({message: "error creating the routine"})
    }
}

//edit a routine
export async function editRoutineController(req, res){
    try{
        const id = req.params.id;
        const data = req.body;

        delete data.id;
        delete data.user_id;

        const check = await verifRoutine(id);
        if (!check){
            throw new Error ("Routine does not exist")
        }

        if (data.routine_name){
            const editName = await editRoutine({routine_name: data}, id);
            res.status(200).json({message: "saved"})
            
        }else{
            throw new Error ("Unexpected field")
        }
    }catch(error){
        console.error("Deu ruim, mano: ", error.message);
        res.status(400).json({message: "did not updtate"})
    }
}

//delete a routine
export async function deleteRoutineController(req , res){
    try{
        const id = req.params.id
        const {confirm} = req.body;
        const regex = /^Deletar$/;

        if (regex.test(String(confirm).trim())){
            const delRoutine = await deleteRoutine({id});
            if (!delRoutine){
                res.status(400).json({message: "user does not exist"})
            }else{
                res.status(200).json({message: "Routine deleted"})
            }

        }
    }catch(error){
        console.error("Deu erro mano: ", error.message);
        res.status(400).json({message: "failed to delete"})
    }
}

//show the esercises
export async function getExerciseByIdController(req, res){
    try{
        const id = req.params.id;
        const getExercise = await getExerciseById({id});
        res.status(200).json(getExercise);
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "failure to query exercises"})
    }
}