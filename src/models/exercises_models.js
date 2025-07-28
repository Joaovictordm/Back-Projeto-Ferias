import {connection} from "../../db.js"


//Model pra criar um exercic
export async function createExercise({routine_id, exercise_name}){
    try{
        const [createExercise] = await connection.query ("INSERT INTO exercise(routine_id, exercise_name) VALUES (?, ?)", [routine_id, exercise_name]);

        return createExercise.insertId;
    }catch(error){
        console.error(error.message);
        throw error;
    }
}

//model pra editar o exercicío
export async function editExercise({exercise_name, exercise_id}){
    try{
        const entries = Object.entries(exercise_name);
        const values = Object.values(exercise_name);


        //Eu poderia não usar essa inserção dinamica, porém acho que é uma boa prática. Como só vou atualizar um campo, ela não é nescessária, mas no futuro talvez  eu adicione outros campos, então vou deixar assim.
        const insert = entries.map(([keys,]) => `${keys} = ?`).join(" , ");

        const editExercise = await connection.query(`UPDATE exercise SET ${insert} WHERE id = ?`, [...values, exercise_id]);

    }catch(error){
        //existem outros tipos de error. São eles o message, name e stack. Message mostra o que deu errado, name mostra o nome do erro e stack mostra onde aconteceu o erro
        console.error(error.message);
        throw error;
    }
}

//model pra apagar o exercicío
export async function deleteExercise({id}){
    try{
        const deleteSerie = await connection.query ("DELETE FROM series WHERE exercise_id = ?", [id])
        const deleteExercise = await connection.query(" DELETE FROM exercise WHERE id = ?", [id]);

    }catch(error){
        console.error(error.message);
        throw error;
    }
}

//Model pra ver as series cadastradas a um exercicío
export async function getSeriesById({id}){
    try{
        const [getserie] = await connection.query(" SELECT exercise.exercise_name, series.weight, series.reps FROM exercise JOIN series ON exercise.id = series.exercise_id WHERE exercise.id = ?", [id]);
        return getserie;
    }catch(error){
        console.error(error.message);
        throw error;
    }   
}