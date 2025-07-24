import { createRoutine } from "../models/routine_models.js";
import { editRoutine } from "../models/routine_models.js";
import { deleteRoutine } from "../models/routine_models.js";
import { getExerciseById } from "../models/routine_models.js";

//controller da query que cria a rotina
export async function createRoutineController(req, res){
    try{
        const user_id = req.params.id;
        const {routine_name} = req.body;
        const newRoutine = await createRoutine({user_id, routine_name});
        res.status(201).json({mensagem: "Rotina criada com sucesso!", id: newRoutine });
    }catch(error){
        console.error("Deu erro, man: ", error.message);
        res.status(500).json({mensagem: "Erro ao criar rotina."})
    }
}

//controller da query pra editar a rotina
export async function editRoutineController(req, res){
    try{
        const id = req.params.id;
        const routine_name = req.body;

        const editName = await editRoutine({routine_name, id});
        res.status(200).json({mensagem: "Salvo!"})
    }catch(error){
        console.error("Deu ruim, mano: ", error.message);
        res.status(400).json({mensagem: "Não atualizou!"})
    }
}

//Controller pra deletar a rotina
export async function deleteRoutineController(req , res){
    try{
        const id = req.params.id
        const delRoutine = await deleteRoutine({id});
        res.status(200).json({mensagem: "Rotina deletada!"});
        
    }catch(error){
        console.error("Deu erro mano: ", error.message);
        res.status(400).json({mensagem: "Falha ao deletar!"})
    }
}

//Controller pra mostrar os exercicios cadastrados em uma rotina
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