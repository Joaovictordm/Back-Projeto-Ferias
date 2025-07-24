import {connection} from "../../db.js"

//query pra criar uma rotina
export async function createRoutine({user_id, routine_name}){
    try{
        const [newRoutine] = await connection.query(
            "INSERT INTO user_routine(user_id, routine_name) VALUES (?, ?)", [user_id, routine_name]);
        return newRoutine.insertId;
    }catch(error){
        console.error("Erro ao criar a rotina: ", error.message);
        throw error;

    }
}

//query pra editar uma rotina
export async function editRoutine({routine_name, id}){
    try{
        const entries = Object.entries(routine_name);
        const values = Object.values(routine_name);

        //string de atualização dinamica. Termo técnico Array destructuring ou desestruturação de array. o key está dentro do [] pq é um array. A virgula é nescessária pq o padrão é vir keys e values, a gente tá pegando apenas as keys, a virgula ajuda a pular o values
        const insertChange = entries.map(([key,]) => `${key} = ?`).join(" , ");//Interpolação é a inserção de uma string no texto. Nesse cado estámos inserindo o array key no texto.

        const edit = await connection.query(`UPDATE user_routine SET ${insertChange} WHERE id = ?`, [...values, id])
    }catch(error){
        console.error("Não conseguiu fazer a mudança: ", error.message);
        throw error;
    }
}

//Query pra deletar uma rotina
export async function deleteRoutine({id}){
    try{
        const delExercise = await connection.query("DELETE FROM exercise WHERE routine_id = ?", [id]);
        const deleteRoutine = await connection.query("DELETE FROM user_routine WHERE id = ?", [id]);
    }catch(error){
        console.error("Não conseguiu deletar, jotinha: ", error.message);
        throw error;
    }
}

//Query pra mostrar os exercicios cadastrados na rotina
export async function getExerciseById({id}){
    try{//Aqui é um pouco complicado de entender a query. Ele vai pegar o nome da rotina e o nome do exercicio do user_routine e do exercise. Ele vai pegar apenas as colunas que o user_routine.id é igual ao exercise.routine_id. Ele vai selecionar a rotina com base no id informado.
        const [getById] = await connection.query("SELECT user_routine.routine_name, exercise.exercise_name FROM user_routine JOIN exercise ON user_routine.id = exercise.routine_id WHERE user_routine.id = ?", [id]);
        return getById;
    }catch(error){
        console.error(error.message);
        throw error;
    }
}