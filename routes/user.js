import express from "express";
import { addUser, getUsers, geUserDetails, updateUser, updatePassword } from "../controllers/user.js";
import checkAuth from "../middleware/auth.js";


const router = express.Router();


router.post("/add-user", checkAuth, addUser);
router.get("/all-user", getUsers);
router.get("/get-user", geUserDetails);
router.put("/update-user/:_id", checkAuth, updateUser);
router.post("/update-password", checkAuth, updatePassword);


export default router;