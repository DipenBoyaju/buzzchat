import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model.js';

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return { message: 'Session expired' };
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select('-password');
    return user;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { message: 'Token has expired' };
    }
    throw error;
  }
};

export default getUserDetailsFromToken;
