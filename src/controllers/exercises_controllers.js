import { createExercise } from "../models/exercises_models.js";
import { editExercise } from "../models/exercises_models.js";
import { deleteExercise } from "../models/exercises_models.js";
import { getExerciseById } from "../models/exercises_models.js";
import { verifRoutine } from "../models/routine_models.js";
import { exerciseId } from "../models/exercises_models.js";
import { generateToken } from "./jwt_controllers.js";


//Create an exercise
export async function createExerciseController(req, res){
    try{
        
        const id = req.routine.id;
        
        const data = req.body;
        const check = await verifRoutine(id);

        if(!check){
            throw new Error ("routine does not exist")
        }

        if(data.exercise_name){
            const create = await createExercise({ id: id , exercise_name: data.exercise_name });
            const token = generateToken({id: create, role: "user"})
            return res.status(200).json({message: "sucess in creating", id: create, token: token});
        }else{
            return res.status(564).json("empty field")
        }
    }catch(error){
        console.error(error.message)
    }
}

//edit an exercise
export async function editExerciseController (req, res){
    try{
        const id = req.exercise.id;
        const data = req.body;
        const allowedFields = ["exercise_name"];
        const update = {};
        const check = await exerciseId(id);

        if(!check){
            throw new Error ("Exercise does not exist")
        }

        for (const key of allowedFields){
            if (data[key]){
                update[key] = data[key];
            }
        }
        const editEx = await editExercise({exercise_name: update, exercise_id: id})
        res.status(200).json("updated exercise")
    }catch(error){
        console.error(error.message);
        res.status(401).json("Empty field")
    }
}

//delete a user
export async function deleteExerciseController(req, res){
    try{
        const id = req.exercise.id;
        const {confirm} = req.body;
        const regex = /^Deletar$/;
        const check = await exerciseId(id);

        if(!check){
            throw new Error ("exercise does not exist")
        }
        if(regex.test(confirm)){
            const delExercise = await deleteExercise({id})
            return res.status(200).json("exercise deleted")
        }else{
            res.status(400).json("Confirmation necessary")
        }

    }catch(error){
        console.error(error.message);
    }
}



//show the esercises
export async function getExerciseByIdController(req, res){
    try{
        const id = req.routine.id;
        const check = await verifRoutine(id);
        if (!check){
            throw new Error ("Routine does not exist")
        }else{
            const getExercise = await getExerciseById({id});
            res.status(200).json(getExercise);
        }
    }catch(error){
        console.error(error.message);
    }
}