import type{Request  , Response , NextFunction} from 'express'

interface AppError{
    statusCode : number;
    message : string;
    stack?:string;
}

export const errorMiddleware = (
    err : AppError,
    req: Request,
    res : Response,
    next : NextFunction
)=>{
    const status = err.statusCode || 500;

    res.status(status).json({
        success : false,
        message : err.message || "internal server Error"
    })
}