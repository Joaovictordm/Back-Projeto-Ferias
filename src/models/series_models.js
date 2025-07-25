import { connection } from "../../db.js";

export async function createSerie({id, weight, reps}){
    try{
        const [create] = await connection.query("INSERT INTO series(exercise_id, weight, reps) VALUES (?, ?, ?)", [id, weight, reps]);
        return create.insertId;
    }catch(error){
        console.error(error.message);
        throw error;
    }
}