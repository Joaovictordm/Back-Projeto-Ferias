import { createSerie } from "../models/series_models.js";

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