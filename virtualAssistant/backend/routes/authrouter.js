import express from 'express';
import { signUp, Login, logOut } from '../controllers/authcontrollers.js';

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",Login)
authRouter.get("/logout",logOut)
export default authRouter;
