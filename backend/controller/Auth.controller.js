import UserModel from "../models/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const checkEmail = await UserModel.findOne({ email })

    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: 'User Already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    return res.status(201).json({
      success: true,
      message: 'User Created Successfully',
      data: newUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    user.activeStatus = true;
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const tokenExpiry = 24 * 3600 * 1000;
    console.log(tokenExpiry);


    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokenExpiry,
      sameSite: 'Strict'
    });

    const { password: hashedPassword, ...userData } = user._doc

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userData,
      token,
      expiresAt: Date.now() + tokenExpiry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const logoutUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({ _id: id });

    user.activeStatus = false;
    await user.save();

    res.clearCookie('token', { httpOnly: true, })
    return res.status(200).json({
      success: true,
      message: 'Successfully Logged Out',
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const updateUserDetail = async (req, res) => {
  const { id } = req.params;

  const { name, profile_pic } = req.body;

  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: { name, profile_pic } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}