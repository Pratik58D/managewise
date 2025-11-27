import express from "express";
import cors from "cors"
import { PORT } from "./utils/env.js";
import userRoutes from "./routes/user.routes.js"
import { errorMiddleware } from "./middleware/error.middleware.js";
import connectDB from "./config/db.js";


const app= express();

// database connection
connectDB();

// use middleware
app.use(express.json());

app.use(
    cors({
    origin : ["http://localhost:3000"],   
    credentials : true,
}))


app.use("/api/v1/user",userRoutes)

app.use(errorMiddleware)

app.get("/",(req,res)=>{
    res.send("hello managewise devloper")
})

app.listen(PORT , ()=> console.log(`server is running on ${PORT}`))