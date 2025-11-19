import express from "express";
import { PORT } from "./utils/env.js";
import userRoutes from "./routes/user.routes.js"

const app= express();

// use middleware
app.use(express.json());

app.use("/api/user",userRoutes)

app.get("/",(req,res)=>{
    res.send("hello managewise devloper")
})


app.listen(PORT , ()=> console.log(`server is running on ${PORT}`))