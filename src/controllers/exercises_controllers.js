import { createExercise } from "../models/exercises_models.js";
import { editExercise } from "../models/exercises_models.js";
import { deleteExercise } from "../models/exercises_models.js";
import { getSeriesById } from "../models/exercises_models.js";


//Create an exercise
export async function createExerciseController(req, res){
    try{
        const id = req.params.id;
        const data = req.body;
        
        delete data.id;
        delete data.routine_id;

        if(data.exercise_name){
            const create = await createExercise({ id , exercise_name: data.exercise_name });
            res.status(200).json({message: "sucess in creating", id: create});
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

        delete data.id;
        delete data.routine_id;

        if(data.exercise_name){
            const edit = await editExercise({exercise_name, exercise_id: id});
            res.status(200).json({message: "Success when updating"});
        }
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

        if(regex.test(String(confirm))){
            const delExercise = await deleteExercise({id})
           

            if(delExercise){
                res.status(200).json({message: "Exercise deleted"})
            }else{
                res.status(400).json({message: "Exercise not founded"})
            }

        }else{
            res.status(400).json({message: "Confirmation necessary"})
        }

    }catch(error){
        console.error(error.message);
        res.status(400).json({message: " failed to delete "})
    }
}

//show the series of an exercise
export async function getSerieByIdController(req, res){
    try{
        const id = req.params.id;
        const getSerie = await getSeriesById({id});
        res.status(200).json(getSerie);
    }catch(error){
        res.status( 400).json({message: "No series found"});
        console.error(error.message);
    }
}