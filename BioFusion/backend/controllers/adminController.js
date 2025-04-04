import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";


// Helper function for consistent error responses
const sendError = (res, message, status = 400) => {
  return res.status(status).json({ success: false, message });
};

// API for adding a doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // Log incoming data for debugging (structured)
    console.log("Adding doctor:", { name, email, speciality });

    // Check for missing fields
    if (!name || !email || !password  || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return sendError(res, "All fields, including image, are required");
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return sendError(res, "Invalid email format");
    }

    // Validate password strength
    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
      return sendError(res, "Password must be strong (8+ chars, mixed case, number, symbol)");
    }

    // Check for existing doctor
    const existingDoctor = await doctorModel.findOne({ $or: [{ email }, { name }] });
    if (existingDoctor) {
      return sendError(res, "Doctor with this email or name already exists", 409);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    // Parse address safely
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch (error) {
      return sendError(res, "Invalid address format (must be valid JSON)");
    }

    // Create doctor data
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees), // Ensure fees is numeric
      address: parsedAddress,
      image: imageUrl,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    console.log("Doctor added successfully:", { id: newDoctor._id, name });
    res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error("Error adding doctor:", error);
    sendError(res, error.message, 500);
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, "Email and password are required");
    }

    // Compare with environment variables (consider using a model instead)
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return sendError(res, "Invalid credentials", 401);
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("Admin logged in:", { email });
    res.json({ success: true, token });
  } catch (error) {
    console.error("Admin login error:", error);
    sendError(res, error.message, 500);
  }
};

// API to get all doctors
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    console.log("Fetched doctors:", doctors.length);
    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    sendError(res, error.message, 500);
  }
};

// API to get all appointments
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    console.log("Fetched appointments:", appointments.length);
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    sendError(res, error.message, 500);
  }
};

// API to cancel an appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return sendError(res, "Appointment ID is required");
    }

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return sendError(res, "Appointment not found", 404);
    }
    if (appointment.cancelled) {
      return sendError(res, "Appointment already cancelled");
    }

    // Update appointment status
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointment;
    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return sendError(res, "Doctor not found", 404);
    }

    let slotsBooked = doctor.slots_booked || {};
    slotsBooked[slotDate] = (slotsBooked[slotDate] || []).filter((slot) => slot !== slotTime);
    await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });

    console.log("Appointment cancelled:", { appointmentId, docId });
    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    sendError(res, error.message, 500);
  }
};

// API for admin dashboard data
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    // const users = await userModel.find({}); // Uncomment if userModel is available
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      users: 0, // Replace with users.length if userModel is uncommented
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    console.log("Dashboard data fetched:", dashData);
    res.json({ success: true, dashData });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    sendError(res, error.message, 500);
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};