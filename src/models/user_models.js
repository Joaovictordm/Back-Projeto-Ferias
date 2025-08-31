import {connection} from "../../db.js";
import bcrypt from "bcrypt";

//Query para criar o usuário
export async function createUser({name, email, password}) {
    try{
        const [newAccount] = await connection.query(
            "INSERT INTO user_login(user_name, user_email, user_password) VALUES (?, ?, ? )",
            [name, email, password]
        );
        return newAccount.insertId;
    }catch (error){
        console.error(error.message);
        throw error;
    }
}

//QUery para criar os dados do usuário
export async function createDataUser({user_id, data}){
    try{
        const entries = Object.entries(data);
        const values = Object.values(data);

        const stringDinamic = entries.map(([key, ]) => `${key}`).join(" ,")

        const [newData] = await connection.query(
            `INSERT INTO user_data(user_id, ${stringDinamic}) VALUES (?, ?, ?, ?, ? , ?, ?)`,
            [user_id, ...values]
        );
        //retorna o ID criado na query. Quando eu coloco a função dentro do [] eu consigo retornar o id criado com o inserId.
        return newData.insertId;
    }catch(error){
        console.error(error.message);
        //Sobe o erro pro controller
        throw error;
    }
}

//query pra pegar as informações do usuário por id
export async function getUserById(id){
    try{
        const [data] = await connection.query(  'SELECT user_login.user_name, user_login.user_email, user_login.created_at, user_data.sex, user_data.age, user_data.weight, user_data.target_weight, user_data.height, user_data.level_physical_activity, user_data.created_at FROM user_login JOIN user_data ON user_login.id = user_data.user_id WHERE user_login.id = ?', [id] );
        return data[0]; //Está retornando o primeiro array, por isso o []. Toda query SQL retorna um array, quando for mostrar um dado sempre coloca um [0] pra ele retornar apenas os primerios valores.
    }catch(error){
        console.error(error.message);
        throw error;
    }
}

//query pra editar as informações
export async function editDataUser({data, id}){
    try{
        //Entries pega chave e valor de dataUser. Exemplo: "peso": "80", o entries transofrma em "peso", "80"
        const entries = Object.entries(data);
        //values faz a mesma coisa, porém ele pega só o valor. Se vier "peso": "80", ele descarta o "peso" e deixa só o valor que é "80"
        const values = Object.values(data);

       //insert change faz uma inserção dinamica. .map é uma estruturta de repetição. ele vai pegar chave e valor de todos os valores do array entries. 
       //Aqui ele descarta o valor e deixa só a chave, então ele vai pegar a chave e colocar em key. O valor ele vai descartar. 
       //O nome disso é string dinamica, então ele guarda apenas o valor e retira a chave da string, nisso ele monta uma string mais o menos assim: "peso = ?". A gente vai inserir essa string lá no query 
        const insertChange = entries.map(([key,]) => `${key} = ?`).join(" , ");
      
        //Aqui usamos o `` pra conseguir fazer a inserção da variável na query. Vamos inserir a string ali.
        //Com isso o código fica muito dinamico. Ele consegue alterar qualquer campo que for colocado no body, não fica limitado apenas a 1 campo
        const [rows] = await connection.query (`UPDATE user_data SET ${insertChange} WHERE user_id = ?`, [...values, id]); //Spread operator é os 3 pontos que eu coloquei. ELe espalha os valores do values dentro do array, pra n ficar um array dentro de outro
        
    }catch(error){
        console.error(error.message);
        throw error;
    }
}

//Query pra deletar as informações
export async function deleteUser({id_login}){
    try{
        const delRotina = await connection.query("DELETE FROM user_routine WHERE user_id= ?", [id_login]);
        const delUser = await connection.query("DELETE FROM user_data WHERE user_id = ?", [id_login]);
        const delLogin = await connection.query("DELETE FROM user_login WHERE id = ?", [id_login]);
    
    }catch(error){
        console.error(error.message);
        throw error
    }
}




//Query pra pegar os dados do usuário 
export async function verifUser({id}){
    try{
        const [rows] = await connection.query("SELECT id FROM user_login WHERE id = ?", [id]);
        return rows[0];
    }catch(error){
        console.error(error);
        throw error;
    }
}

export async function getLogin(email){
    try{
        const [rows] = await connection.query ("SELECT user_password, id, user_email FROM user_login WHERE user_email = ?", [email]);

        //Usar o return assim é bom pra quando quer retornar apenas um campo, como por exemplo o user_password. Ele vê se o rows existe e retorna o password
        return rows[0] || null;
        //return rows[0] || null; é bom pra quando quer retornar tudo, se não tiver nada é nulo.
        //ele tava dando erro antes pq o return rows[0] || null retorna um objeto, chave e valor e o compare não espera um objeto. Por isso com o rows[0]?.user_password ele retorna só o valor do user password
    }catch(error){
        console.log(error);
        throw error;
    }
}


//Criptografar senha
export async function encryptPassword(password){

    const saltRounds = 10;
    
    const hash = await bcrypt.hash(password, saltRounds); 
    
    return hash
   
}
//comparar a senha
export async function comparePassword(password, hash){
 
    const compare = bcrypt.compare(password, hash);
    return compare
}


