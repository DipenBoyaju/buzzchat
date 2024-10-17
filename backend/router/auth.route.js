import express from "express";
import { loginUser, logoutUser, registerUser, updateUserDetail } from "../controller/Auth.controller.js";


const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout/:id').post(logoutUser)
router.route('/updateUser/:id').patch(updateUserDetail)


export default router