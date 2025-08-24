import { createExercise } from "../models/exercises_models.js";
import { editExercise } from "../models/exercises_models.js";
import { deleteExercise } from "../models/exercises_models.js";
import { getExerciseById } from "../models/routine_models.js";
import { verifRoutine } from "../models/routine_models.js";
import { exerciseId } from "../models/exercises_models.js";


//Create an exercise
export async function createExerciseController(req, res){
    try{
        const id = req.params.id;
        const data = req.body;
        const check = await verifRoutine(id);

        if(!check){
            return res.status(423).json("routine does not exist")
        }

        if(data.exercise_name){
            const create = await createExercise({ id , exercise_name: data.exercise_name });
            return res.status(200).json({message: "sucess in creating", id: create});
        }else{
            return res.status(564).json({message: "empty field"})
        }
    }catch(error){
        console.error(error.message)
        res.status(400).json({message: "Failure to create"})
    }
}

//edit an exercise
export async function editExerciseController (req, res){
    try{
        const id = req.params.id;
        const data = req.body;
        const allowedFields = ["exercise_name"];
        const update = {};
        const check = await exerciseId(id);

        if(!check){
            return res.status(400).json("Exercise does not exist")
        }

        for (const key of allowedFields){
            if (data[key]){
                update[key] = data[key];
            }
        }
        const editEx = await editExercise({exercise_name: update, exercise_id: id})
        res.status(200).json("ipdated exercise")
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Failure to update"});
    }
}

//delete a user
export async function deleteExerciseController(req, res){
    try{
        const id = req.params.id;
        const {confirm} = req.body;
        const regex = /^Deletar$/;
        const check = await exerciseId(id);

        if(!check){
            return res.status(400).json("exercise does not exist")
        }
        if(regex.test(confirm)){
            const delExercise = await deleteExercise({id})
            return res.status(200).json("exercise deleted")
        }else{
            res.status(400).json({message: "Confirmation necessary"})
        }

    }catch(error){
        console.error(error.message);
        res.status(400).json({message: " failed to delete "})
    }
}



//show the esercises
export async function getExerciseByIdController(req, res){
    try{
        const id = req.params.id;
        const check = await verifRoutine(id);

        if (!check){
            return res.status(400).json("Routine does not exist")
        }

        const getExercise = await getExerciseById({id});
        res.status(200).json(getExercise);
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "failure to query exercises"})
    }
}