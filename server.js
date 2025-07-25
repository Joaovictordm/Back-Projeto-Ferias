import "dotenv/config.js";
import express from "express";
import userRoute from "./src/routes/user_routes.js";
import routineRoute from "./src/routes/routine_routes.js";
import exerciseRoute from "./src/routes/exercises_routes.js";
import seriesRoute from "./src/routes/series_routes.js";

const app = express();
app.use(express.json());

app.use("/users", userRoute);
app.use("/routine", routineRoute);
app.use("/exercise", exerciseRoute);
app.use("/series", seriesRoute);




const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Tudo certo, man")
})