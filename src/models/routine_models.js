import {connection} from "../../db.js"

//query pra criar uma rotina
export async function createRoutine({user_id, routine_name}){
    try{
        const [newRoutine] = await connection.query(
            "INSERT INTO user_routine(user_id, routine_name) VALUES (?, ?)", [user_id, routine_name]
        );
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

        const insertChange = entries.map(([key,]) => `${key} = ?`).join("  ");

        const edit = await connection.query(`UPDATE user_routine SET ${insertChange} WHERE id = ?`, [...values, id])
        return edit;
    }catch(error){
        console.error("Não conseguiu fazer a mudança: ", error.message);
        throw error;
    }
}

//Query pra deletar uma rotina

export async function deleteRoutine({id}){
    try{
        const deleteRoutine = await connection.query("DELETE FROM user_routine WHERE id = ?", [id]);
    }catch(error){
        console.error("Não conseguiu deletar, jotinha: ", error.message);
        throw error;
    }
}