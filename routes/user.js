import express from "express";
import { addUser, getUsers, geUserDetails, updateUser } from "../controllers/user.js";
import checkAuth from "../middleware/auth.js";


const router = express.Router();


router.post("/add-user", checkAuth, addUser);
router.get("/all-user", getUsers);
router.get("/get-user", geUserDetails);
router.put("/update-user/:_id", checkAuth, updateUser);


export default router;