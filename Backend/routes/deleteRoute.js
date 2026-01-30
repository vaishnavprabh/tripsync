import express from "express";
import { deleteUser} from "../controllers/deleteServices.js";

const router=express.Router();

router.delete('/deleteUser/:id', deleteUser)



export default router