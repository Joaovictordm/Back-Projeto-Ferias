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
export async function createDataUser({ user_id, sex, age,weight, target_weight, height, level_physical_activity }){
    try{
        const [newData] = await connection.query(
            "INSERT INTO user_data(user_id ,sex, age, weight, target_weight, height, level_physical_activity) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
            [user_id,sex, age, weight, target_weight, height, level_physical_activity]
        );
        return newData.insertId;
    }catch(error){
        console.error("Erro ao adicionar dados: ", error.message);
        throw error;
    }
}

//query pra pegar as informações do usuário por id
export async function getUserById(id){
    try{
        const [data] = await connection.query(  'SELECT user_login.id ,user_login.user_name, user_login.user_email, user_login.user_password, user_login.created_at, user_data.sex, user_data.age, user_data.weight, user_data.target_weight, user_data.height, user_data.level_physical_activity, user_data.created_at FROM user_login JOIN user_data ON user_login.id = user_data.user_id WHERE user_login.id = ?', [id] );
        return data[0]; //Está retornando o primeiro array, por isso o []. Toda query SQL retorna um array, quando for mostrar um dado sempre coloca um [0] pra ele retornar apenas os primerios valores.
    }catch(error){
        console.error("Usuário não existe: ", error.message);
        throw error;
    }
}

//query pra editar as informações
export async function editDataUser(dataUser, id){
    try{
        const entries = Object.entries(dataUser);
        const values = Object.values(dataUser);
       
        const insertChange = entries.map(([key,]) => `${key} = ?`).join(" , ");
        
        const data = await connection.query (`UPDATE user_data SET ${insertChange} WHERE user_id = ?`, [...values, id]); //Spread operator é os 3 pontos que eu coloquei. ELe espalha os valores do values dentro do array, pra n ficar um array dentro de outro
        
    }catch(error){
        console.error("Não conseguiu fazer a mudança", error.message);
        throw error;
    }
}

//Query pra deletar as informações
export async function deleteUser(login_id){
    try{
        const delRotina = await connection.query("DELETE FROM user_routine WHERE user_id= ?", [login_id]);
        const delUser = await connection.query("DELETE FROM user_data WHERE user_id = ?", [login_id]);
        const delLogin = await connection.query("DELETE FROM user_login WHERE id = ?", [login_id]);
    
    }catch(error){
        console.error("Não conseguiu deletar: ", error.message);
        throw error
    }
}

//Query pra mostrar as rotinas cadastradas em um usuário
export async function getRoutineById(id){
    try{
        const [getRoutine] = await connection.query("SELECT user_login.user_name, user_routine.routine_name FROM user_login JOIN user_routine ON user_login.id = user_routine.user_id WHERE user_login.id = ?", [id]);
        return getRoutine;
    }catch(error){
        console.error("Não conseguiu achar a rotina: ", error.message);
        throw error
    }
}