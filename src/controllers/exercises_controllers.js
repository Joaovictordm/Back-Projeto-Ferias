import { createExercise } from "../models/exercises_models.js";
import { editExercise } from "../models/exercises_models.js";
import { deleteExercise } from "../models/exercises_models.js";
import { getSeriesById } from "../models/exercises_models.js";


//Create an exercise
export async function createExerciseController(req, res){
    try{
        const id = req.params.id;
        const {exercise_name} = req.body;
        
        const create = await createExercise({ routine_id: id , exercise_name });
        res.status(200).json({message: "sucess in creating", id: create});
    }catch(error){
        console.error(error.message)
        res.status(400).json({message: "Failure to create"})
    }
}

//edit an exercise
export async function editExerciseController (req, res){
    try{
        const id = req.params.id;
        const exercise_name = req.body;

        const edit = await editExercise({exercise_name, exercise_id: id});
        res.status(200).json({message: "Success when updating"});
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Failure to update"});
    }
}

//delete a user
export async function deleteExerciseController(req, res){
    try{
        const id = req.params.id;

        const delExercise = await deleteExercise({id})
        res.status(200).json({message: "Exercise deleted!"})
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