import "dotenv/config.js";
import express from "express";
import userRoute from "./src/routes/user_routes.js";
import routineRoute from "./src/routes/routine_routes.js";
import exerciseRoute from "./src/routes/exercises_routes.js";
import seriesRoute from "./src/routes/series_routes.js";

//colocando o express em uma constante
const app = express();
app.use(express.json());
//falando que a constante que o express está vai usar json


//End points. Quando cada um desses for acessado, vai chamar a função depois da virgula
app.use("/users", userRoute);
app.use("/routine", routineRoute);
app.use("/exercise", exerciseRoute);
app.use("/series", seriesRoute);



//"liga o servidor". Pega os dados no .env e coloca em uma constante.
const PORT = process.env.PORT;
//liga a porta 8080 pra uso
app.listen(PORT, () => {
    console.log("ok")
})