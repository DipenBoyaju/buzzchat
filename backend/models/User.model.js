import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide Name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Provide Email']
  },
  password: {
    type: String,
    required: [true, "Provide Password"]
  },
  profile_pic: {
    type: String,
    default: ''
  },
  activeStatus: {
    type: Boolean,
    default: false
  },
}, { timestamps: true })

const UserModel = mongoose.model('User', userSchema);
export default UserModel; 