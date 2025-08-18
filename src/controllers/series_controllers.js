import { createSerie } from "../models/series_models.js";
import { previousSerie } from "../models/series_models.js";
import { delSerie } from "../models/series_models.js";
import { exerciseId } from "../models/exercises_models.js";

//Create a series
export async function createSerieController(req, res){
    try{
        const id = req.params.id;
        const data = req.body;
        const check = await exerciseId(id);
        
        
        if(!check){
           return res.status(400).json({message: "exercise does not exist "})
        }

        delete data.id
        delete data.exercise_id;

        if(data.weight && data.reps){
            const create = await createSerie({id, weight: data.weight, reps: data.reps});
            res.status(200).json({message: "series added", id: create});

        }

    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Error adding series"})
    }

}


//watch previous series
export async function previousSerieController(req, res){
    try{
        const exercise_id = req.params.exercise_id

        const prev = await previousSerie({exercise_id});

        res.status(200).json(prev)
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Error when consulting previous"})
    }
}

//delete a series
export async function delSerieController(req, res){
    try{
        const id = req.params.id;

        const del = delSerie({id});
        res.status(200).json({message: "series deleted"});
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Error deleting"})
    }
}