import {connection} from "../../db.js";

//Query para criar o usuário
export async function createUser({name, email, password}) {
    try{
        const [newAccount] = await connection.query(
            "INSERT INTO user_login(user_name, user_email, user_password) VALUES (?, ?, ? )",
            [name, email, password]
        );
        return newAccount.insertId;
    }catch (error){
        console.error("Erro ao criar o usuário: ", error.message);
        throw error;
    }
}
//QUery para criar os dados do usuário
export async function createDataUser({sex, age,weight, target_weight, height, level_physical_activity }){
    try{
        const [newDate] = await connection.query(
            "INSERT user_data(sex, age, weight, target_weight, height, level_physical_activity) VALUES (?, ?, ?, ?, ?, ?)",
            [sex, age, weight, target_weight, height, level_physical_activity]
        );
        return newDate.insertId;
    }catch(error){
        console.error("Erro ao adicionar dados: ", erros.message);
        throw error;
    }
}
//query pra pegar as informações do usuário por id
export async function getUserById({id}){
    try{
        const [date] = await connection.query(  'SELECT user_login.id ,user_login.user_name, user_login.user_email, user_login.user_password, user_login.created_at user_data.sex, user_data.age, user_data.weight, user_data.target_weight, user_data.height, user_data.level_physical_activity, user_data.created_at FROM user_login JOIN user_data ON user_login.id = user_data.user_id WHERE user_login.id = ?', [id] );
        return result[0];
    }catch(error){
        console.error("Usuário não existe: ", error, message)
        throw error;
    }
}