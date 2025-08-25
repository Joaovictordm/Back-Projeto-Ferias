import { createSerie } from "../models/series_models.js";
import { previousSerie } from "../models/series_models.js";
import { delSerie } from "../models/series_models.js";
import { exerciseId, getExerciseById } from "../models/exercises_models.js";
import { getSerie } from "../models/series_models.js";
import {getSeriesById} from "../models/series_models.js"
import validator from "validator";

//Create a series
export async function createSerieController(req, res){
    try{
        const id = req.params.id;
        const {weight, reps} = req.body;
        const check = await exerciseId(id);
        if(!check){
           return res.status(400).json({message: "exercise does not exist "})
        }
        if (!validator.isInt(reps.toString()) || !validator.isFloat(weight.toString())){
            return res.status(404).json({message: "empty field"})
        }else{
            const create = await createSerie({id, weight, reps});
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
        const check = await exerciseId(exercise_id);
        if(!check){
            return res.status(400).json({message: "exercise does not exist"})
        }else{
            const prev = await previousSerie({exercise_id});
            res.status(200).json(prev)
        }
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Error when consulting previous"})
    }
}

//delete a series
export async function delSerieController(req, res){
    try{
        const id = req.params.id;
        const check = await getSerie(id);
        const {confirm} = req.body;
        const regex = /^Deletar$/;

        
        if(!check){
            return res.status(404).json({message: "serie does not exist"})
        }else{
            if(regex.test(confirm)){
                const del = delSerie({id});
                res.status(200).json({message: "Serie deleted"})
            }else{
                return res.status(400).json("Confirmation required")
            }
        }

       
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Error deleting"})
    }
}

//show the series of an exercise
export async function getSerieByIdController(req, res){
    try{
        const id = req.params.id;
        const check = await exerciseId(id);

        if(!check){
            return res.status(400).json("Exercise does not exist")
        }else{
            const getSerie = await getSeriesById({id});
            res.status(200).json(getSerie);
        }
    }catch(error){
        res.status( 400).json({message: "No series found"});
        console.error(error.message);
    }
}