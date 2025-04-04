import express from "express";
import {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentCancel,
  appointmentsAdmin,
  loginAdmin,
} from "../controllers/adminController.js";
// import { changeAvailability } from "../controllers/doctorController.js"; // Fixed typo assumption
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

// Public route (no auth required)
adminRouter.post("/login", loginAdmin);

// Protected routes (apply authAdmin globally)
adminRouter.use(authAdmin);

// Assuming addDoctor needs file upload (e.g., doctor profile image)
adminRouter.post("/add-doctor", upload.single("image"), addDoctor); // Adjust 'image' to your field name
adminRouter.get("/all-doctors", allDoctors);
// adminRouter.post("/change-availability", changeAvailability); // Fixed typo
adminRouter.get("/appointments", appointmentsAdmin);
adminRouter.post("/cancel-appointment", appointmentCancel);
adminRouter.get("/dashboard", adminDashboard);

export default adminRouter;