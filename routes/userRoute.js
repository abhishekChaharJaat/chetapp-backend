import express from "express";
import {
  getOtherUsers,
  login,
  logout,
  register,
  getUserDetails,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated, getOtherUsers);

// Add the route for user details
router.route("/me").get(isAuthenticated, getUserDetails);

export default router;
