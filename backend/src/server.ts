import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { PORT } from "./utils/env.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js"
import googleRoutes from "./routes/googlesignin.route.js"
import categoryRoutes from "./routes/category.routes.js"
import productRoutes from "./routes/product.routes.js"
import stockHistoryRoutes from "./routes/stockHistory.routes.js"



const app= express();

// database connection
connectDB();

// use middleware
app.use(express.json());
app.use(cookieParser())

app.use(
    cors({
    origin : ["http://localhost:3000"],   
    credentials : true,
}))


// Routes
app.use("/api", googleRoutes)
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product" , productRoutes)
app.use("/api/v1/stock-history" , stockHistoryRoutes)

app.use(errorMiddleware)

app.get("/",(req,res)=>{
    res.send("hello managewise devloper")
})

app.listen(PORT , ()=> console.log(`server is running on ${PORT}`))