import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: [String], // array of city names
    default: [],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
