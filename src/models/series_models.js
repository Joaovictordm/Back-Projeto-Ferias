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
export async function previousSerie({exercise_id}){
    try{
        //created att é mais confiável pra usar quando for se tratar de histórico. Não é bom usar o id pq ele retorna apenas o ultimo id adicionado, não o ultimo create_at adicionado
        //Essa query o que faz? Ela seleciona o id do exercicio, o peso e as repetições de series onde o id do exercicio é ? (A gente vai colopcar depois). o created_at vai pegar o ultimmo create_at adicionado onde o exercise_id é o escolhido. Ele vai odernar por uma ordem crescente
        const [prevSerie] = await connection.query ("SELECT id, weight, reps FROM series WHERE exercise_id = ? AND DATE(created_at) = (SELECT DATE(MAX (created_at)) FROM series WHERE exercise_id = ? ) ORDER BY id ASC", [exercise_id, exercise_id]);
        return prevSerie;
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