import {connection} from "../../db.js";

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