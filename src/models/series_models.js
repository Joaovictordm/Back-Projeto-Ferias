import { connection } from "../../db.js";

//Model pra adicionar série
export async function createSerie({id, weight, reps}){
    try{
        const [create] = await connection.query("INSERT INTO series(exercise_id, weight, reps) VALUES (?, ?, ?)", [id, weight, reps]);
        return create.insertId;
    }catch(error){
        console.error(error.message);
        throw error;
    }
}

//Model pra mostrar a série passada
export async function previousSerie({serie_id, exercise_id}){
    try{
        //created att é mais confiável pra usar quando for se tratar de histórico. Não é  bom usar o id pq ele pode não estar na ordem, com o create at não corre esse risco
        const [prevSerie] = await connection.query ("SELECT series.exercise_id, series.weight, series.reps FROM series WHERE id < ? AND exercise_id = ? ORDER BY id DESC LIMIT 1", [serie_id, exercise_id]);
        return prevSerie[0] || null;
    }catch(error){
        console.error(error.message);
        throw error;
    }
}

//Model pra deletar a série
export async function delSerie({id}){
    try{
        const del = await connection.query ("DELETE FROM series WHERE id = ?", [id]);

    }catch(error){
        console.error(error.message);
        throw error;
    }
}