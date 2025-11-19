import type{Request ,Response} from 'express';
import * as userService from "../services/user.services.js";


export class UserController{
    // signup method
    async signup(req:Request , res : Response){
        try {
             const user = await userService.signup(req.body);
             res.status(201).json(user);
        } catch (error:any) {
            res.status(400).json({ error: error.message });
        }
    }


    // login method
    async login(req:Request , res:Response){
        try {
            const token = await userService.login(req.body);
             res.json({ token });
        } catch (error : any) {
            res.status(400).json({ error: error.message }); 
        }
    }
}