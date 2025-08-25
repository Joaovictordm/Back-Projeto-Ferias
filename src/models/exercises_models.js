import {connection} from "../../db.js"


//Model pra criar um exercic
export async function createExercise({id, exercise_name}){
    try{
        const [createExercise] = await connection.query ("INSERT INTO exercise(routine_id, exercise_name) VALUES (?, ?)", [id, exercise_name]);

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

        return deleteExercise || null;
    }catch(error){
        console.error(error.message);
        throw error;
    }
}



export async function exerciseId(id){
    try{
        const [rows] = await connection.query( "SELECT id FROM exercise WHERE id = ?", [id]);
        return rows[0];
    }catch(error){
        console.error(error);
        throw error;
    }
}
//Query pra mostrar os exercicios cadastrados na rotina
export async function getExerciseById({id}){
    try{//Aqui é um pouco complicado de entender a query. Ele vai pegar o nome da rotina e o nome do exercicio do user_routine e do exercise. Ele vai pegar apenas as colunas que o user_routine.id é igual ao exercise.routine_id. Ele vai selecionar a rotina com base no id informado.
        const [getById] = await connection.query("SELECT user_routine.routine_name, exercise.exercise_name FROM user_routine JOIN exercise ON user_routine.id = exercise.routine_id WHERE user_routine.id = ?", [id]);
        return getById || null;
    }catch(error){
        console.error(error.message);
        throw error;
    }
}