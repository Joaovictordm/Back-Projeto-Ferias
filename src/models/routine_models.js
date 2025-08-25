import {connection} from "../../db.js"

//query pra criar uma rotina
export async function createRoutine({user_id, data}){
    try{
        const [newRoutine] = await connection.query(
            "INSERT INTO user_routine(user_id, routine_name) VALUES (?, ?)", [user_id, data]);
        return newRoutine.insertId;
    }catch(error){
        console.error(error.message);
        throw error;

    }
}

//query pra editar uma rotina
export async function editRoutine({routine_name, id}){
    try{
       
        //Auqi eu tenho que tomar cuidado para não passar algo que não seja um objeto. Se eu passar, por exemplo, perna, ele vai desestruturar a string perna. Eu tenho que garantir que vai vir um objeto. routine_name: perna, assim ele faz a separação correta do que é chave e do que é valor
        const entries = Object.entries(routine_name);
        const values = Object.values(routine_name);
        //string de atualização dinamica. Termo técnico Array destructuring ou desestruturação de array. o key está dentro do [] pq é um array. A virgula é nescessária pq o padrão é vir keys e values, a gente tá pegando apenas as keys, a virgula ajuda a pular o values
        const insertChange = entries.map(([key,]) => `${key} = ?`).join(" , ");//Interpolação é a inserção de uma string no texto. Nesse cado estámos inserindo o array key no texto.

        const edit = await connection.query(`UPDATE user_routine SET ${insertChange} WHERE id = ?`, [...values, id])
    }catch(error){
        console.error(error.message);
        throw error;
    }
}

//Query pra deletar uma rotina
export async function deleteRoutine({id}){
    try{
        const deleteRoutine = await connection.query("DELETE FROM user_routine WHERE id = ?", [id]);
    }catch(error){
        console.error( error.message);
        throw error;
    }
}



export async function verifRoutine(id){
    try{
        const [rows] = await connection.query ("SELECT routine_name FROM user_routine WHERE id = ?", [id]);

        return rows[0] || null;
        
    }catch(error){
        console.log(error);
        throw error;
    }
}
//Query pra mostrar as rotinas cadastradas em um usuário
export async function getRoutineById({id}){
    try{
        const [getRoutine] = await connection.query("SELECT user_login.user_name, user_routine.routine_name FROM user_login JOIN user_routine ON user_login.id = user_routine.user_id WHERE user_login.id = ?", [id]);
        return getRoutine;
    }catch(error){
        console.error(error.message);
        throw error
    }
}