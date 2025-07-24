import { createExercise } from "../models/exercises_models.js";
import { editExercise } from "../models/exercises_models.js";
import { deleteExercise } from "../models/exercises_models.js";


//controller pra criar um exercicío
export async function createExerciseController(req, res){
    try{
        const id = req.params.id;
        const {exercise_name} = req.body;
        
        const create = await createExercise({ routine_id: id , exercise_name });
        res.status(200).json({mensagem: "sucess in creating", id: create});
    }catch(error){
        console.error(error.message)
        res.status(400).json({mensagem: "Failure to create"})
    }
}

//Controller pra editar o exercicío
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

//Controller pra deletar um usuário
export async function deleteExerciseController(req, res){
    try{
        const id = req.params.id;

        const delExercise = deleteExercise({id})
        res.status(200).json({message: "Exercise deleted!"})
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: " failed to delete "})
    }
}