import { createSerie } from "../models/series_models.js";
import { previousSerie } from "../models/series_models.js";
import { delSerie } from "../models/series_models.js";
import { exerciseId, getExerciseById } from "../models/exercises_models.js";
import { getSerie } from "../models/series_models.js";
import {getSeriesById} from "../models/series_models.js"
import validator from "validator";
import { generateToken } from "./jwt_controllers.js";

//Create a series
export async function createSerieController(req, res){
    try{
        const id = req.exercise.id;
        const {weight, reps} = req.body;
        const check = await exerciseId(id);
        
        if(!check){
           throw new Error ("exercise does not exist ")
        }
        if (!validator.isInt(reps.toString()) || !validator.isFloat(weight.toString())){
            return res.status(404).json("empty field")
        }else{
            const create = await createSerie({id, weight, reps});
            const token = generateToken({id: create, role: "user"})
            res.status(200).json({message: "series added", id: create, token: token});
        }
    }catch(error){
        console.error(error.message);
        res.status(401).json("Empty field")
    }
}
//watch previous series
export async function previousSerieController(req, res){
    try{
        const exercise_id = req.exercise.id
        const check = await exerciseId(exercise_id);
        if(!check){
            throw new Error ("exercise does not exist")
        }else{
            const prev = await previousSerie({exercise_id});
            res.status(200).json(prev)
        }
    }catch(error){
        console.error(error.message);
    }
}

//delete a series
export async function delSerieController(req, res){
    try{
        const id = req.serie.id;
        const check = await getSerie(id);
        const {confirm} = req.body;
        const regex = /^Deletar$/;

        
        if(!check){
            throw new Error ("serie does not exist")
        }else{
            if(regex.test(confirm)){
                const del = delSerie({id});
                res.status(200).json("Serie deleted")
            }else{
                return res.status(400).json("Confirmation required")
            }
        }
    }catch(error){
        console.error(error.message);
    }
}

//show the series of an exercise
export async function getSerieByIdController(req, res){
    try{
        const id = req.exercise.id;
        const check = await exerciseId(id);

        if(!check){
            throw new Error ("Exercise does not exist")
        }else{
            const getSerie = await getSeriesById({id});
            res.status(200).json(getSerie);
        }
    }catch(error){
        console.error(error.message);
    }
}