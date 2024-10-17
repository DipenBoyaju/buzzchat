import express from "express";
import { getAllUserDetail, searchUser, userDetail } from "../controller/User.controller.js";
import { updateUserDetail } from "../controller/Auth.controller.js";


const router = express.Router()


router.route('/userDetail/:id').get(userDetail)
router.route('/getAllUserDetail').get(getAllUserDetail)
router.route('/updateUserDetail/:id').patch(updateUserDetail)
router.route('/searchUser/:searchTitle').get(searchUser)



export default router