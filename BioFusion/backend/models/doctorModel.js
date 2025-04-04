import mongoose from "mongoose";

// Sub-schema for address to provide structure
const addressSchema = new mongoose.Schema({
  street: { type: String, required: false },
  city: { type: String, required: true },
  state: { type: String, required: false },
  country: { type: String, required: false },
  postalCode: { type: String, required: false },
});

// Main doctor schema
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // This creates the unique index automatically
      lowercase: true,
      match: [/.+@.+\..+/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    image: {
      type: String,
      required: [true, "Profile image is required"],
    },
    speciality: {
      type: String,
      required: [true, "Speciality is required"],
      enum: {
        values: [
          "General Physician",
          "Cardiologist",
          "Dermatologist",
          "Neurologist",
          "Pediatrician",
          // Add more specialties as needed
        ],
        message: "{VALUE} is not a valid speciality",
      },
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: [0, "Experience cannot be negative"],
    },
    about: {
      type: String,
      required: [true, "About section is required"],
      minlength: [10, "About must be at least 10 characters"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    fees: {
      type: Number,
      required: [true, "Fees are required"],
      min: [0, "Fees cannot be negative"],
    },
    address: {
      type: addressSchema,
      required: [true, "Address is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    slots_booked: {
      type: Map,
      of: [String],
      default: () => new Map(),
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Index for speciality (non-unique, for query optimization)
doctorSchema.index({ speciality: 1 });

// Model creation
const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;