import { verifyToken } from "../controllers/jwt_controllers.js";

export function authMiddlewareUser(req, res, next){
    const authHeader = req.headers["authorization"];
    //const user = req.body;
    //Tem duas formas de acessar os dados do user, a primeira com dot notation que seria objeto.chave (user.name), segundo seria com bracket notation que seria objeto[chave](user[name]). O bracket notation é melhor parar quando quiser tirar uma informação dinamica, ele não fica limitado aop que foi passado. o dot notation é melhor quando quer tirar apenas uma informação especifica. Nesse caso do nome do usuário é melhor usar o dot notation obj.key
    if(!authHeader){
        res.status(401).json("Token not provided")
        
        
    }
    //O SPLIT SEPARA STRING EM ARRAYS. Ele separa o que vier de string e coloca em um array, como por exemplo se eu enviar um "ajshdjkash askdjaksj" na string, ele vai separar em um arrray assim ["ajshdjkash", "askdjaksj"] 
    const [aux, token] = authHeader.split(" ");
    const decoded = verifyToken(token);

    if(!decoded){
        throw new Error("Invalid token")
    }

    req.user = decoded;
    next();
}

export function authMiddlewareRoutine(req, res, next){
    const authHeader = req.headers["authorization"];
    //const user = req.body;
    //Tem duas formas de acessar os dados do user, a primeira com dot notation que seria objeto.chave (user.name), segundo seria com bracket notation que seria objeto[chave](user[name]). O bracket notation é melhor parar quando quiser tirar uma informação dinamica, ele não fica limitado aop que foi passado. o dot notation é melhor quando quer tirar apenas uma informação especifica. Nesse caso do nome do usuário é melhor usar o dot notation obj.key
    if(!authHeader){
        res.status(401).json("Token not provided")
        
        
    }
    //O SPLIT SEPARA STRING EM ARRAYS. Ele separa o que vier de string e coloca em um array, como por exemplo se eu enviar um "ajshdjkash askdjaksj" na string, ele vai separar em um arrray assim ["ajshdjkash", "askdjaksj"] 
    const [aux, token] = authHeader.split(" ");
    const decoded = verifyToken(token);

    if(!decoded){
        throw new Error("Invalid token")
    }

    req.routine = decoded;
    next();
}


export function authMiddlewareExercise(req, res, next){
    const authHeader = req.headers["authorization"];
    //const user = req.body;
    //Tem duas formas de acessar os dados do user, a primeira com dot notation que seria objeto.chave (user.name), segundo seria com bracket notation que seria objeto[chave](user[name]). O bracket notation é melhor parar quando quiser tirar uma informação dinamica, ele não fica limitado aop que foi passado. o dot notation é melhor quando quer tirar apenas uma informação especifica. Nesse caso do nome do usuário é melhor usar o dot notation obj.key
    if(!authHeader){
        res.status(401).json("Token not provided")
        
        
    }
    //O SPLIT SEPARA STRING EM ARRAYS. Ele separa o que vier de string e coloca em um array, como por exemplo se eu enviar um "ajshdjkash askdjaksj" na string, ele vai separar em um arrray assim ["ajshdjkash", "askdjaksj"] 
    const [aux, token] = authHeader.split(" ");
    const decoded = verifyToken(token);

    if(!decoded){
        throw new Error("Invalid token")
    }

    req.exercise = decoded;
    next();
}


export function authMiddlewareSerie(req, res, next){
    const authHeader = req.headers["authorization"];
    //const user = req.body;
    //Tem duas formas de acessar os dados do user, a primeira com dot notation que seria objeto.chave (user.name), segundo seria com bracket notation que seria objeto[chave](user[name]). O bracket notation é melhor parar quando quiser tirar uma informação dinamica, ele não fica limitado aop que foi passado. o dot notation é melhor quando quer tirar apenas uma informação especifica. Nesse caso do nome do usuário é melhor usar o dot notation obj.key
    if(!authHeader){
        res.status(401).json("Token not provided")
        
        
    }
    //O SPLIT SEPARA STRING EM ARRAYS. Ele separa o que vier de string e coloca em um array, como por exemplo se eu enviar um "ajshdjkash askdjaksj" na string, ele vai separar em um arrray assim ["ajshdjkash", "askdjaksj"] 
    const [aux, token] = authHeader.split(" ");
    const decoded = verifyToken(token);

    if(!decoded){
        throw new Error("Invalid token")
    }

    req.serie = decoded;
    next();
}