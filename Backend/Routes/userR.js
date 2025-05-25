const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, getAllUser, updatePassword, updateProfile, getSingleUser, updateUserRole, deleteUser, newAppointment, getMyAppointments 
} = require("../controller/userC");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// import { newAppointment } from "../controller/userC";

const router = express.Router();
router.post("/appointment/new", isAuthenticatedUser, newAppointment);
router.get("/appointments/me", isAuthenticatedUser, getMyAppointments);
// router.route("/register").post(registerUser);
router.route("/register").post(upload.single("avatar"), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/me/update").put(isAuthenticatedUser, upload.single("avatar"), updateProfile);



router
    .route("/admin/users")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
    .route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;