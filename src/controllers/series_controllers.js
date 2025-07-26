import { createSerie } from "../models/series_models.js";
import { previousSerie } from "../models/series_models.js";
import { delSerie } from "../models/series_models.js";

//Controller pra criar uma série
export async function createSerieController(req, res){
    try{
        const id = req.params.id;
        const {weight, reps} = req.body;

        const create = await createSerie({id, weight, reps});
        res.status(200).json({message: "Serie adicionada", id: create});
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Error adding series"})
    }

}


//COntroller pra ver a série anterior
export async function previousSerieController(req, res){
    try{
        const serie_id = req.params.serie_id;
        const exercise_id = req.params.exercise_id

        const prev = await previousSerie({serie_id, exercise_id});

        res.status(200).json(prev)
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Error when consulting previous"})
    }
}

//Controller pra deletar uma série
export async function delSerieController(req, res){
    try{
        const id = req.params.id;

        const del = delSerie({id});
        res.status(200).json({message: "serie deletada"});
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Error deleting"})
    }
}