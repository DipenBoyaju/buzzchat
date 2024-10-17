import UserModel from "../models/User.model.js";


export const userDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const userDetail = await UserModel.findOne({ _id: id });
    if (!userDetail) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { password: hashedPassword, ...userData } = userDetail._doc

    return res.status(200).json({
      success: true,
      user: userData,
    });

  } catch (error) {
    return res.status(500).json({
      succcess: false,
      message: error.message
    })
  }
}


export const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { name, email, activeStatus, profile_pic } = req.body;

  try {
    const userDetail = await UserModel.findOneAndUpdate(
      { _id: id },
      { name, email, activeStatus, profile_pic },
      { new: true }
    )

    if (!userDetail) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User Detail updated successfully',
      data: userDetail,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const getAllUserDetail = async (req, res) => {
  try {
    const userData = await UserModel.find()
    if (!userData || userData.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data not found',
      });
    }
    return res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const searchUser = async (req, res) => {
  try {
    const { searchTitle } = req.params;

    const query = new RegExp(searchTitle, "i")

    const user = await UserModel.find({
      "$or": [
        { name: query }
      ]
    }).select("-password")

    return res.status(200).json({
      success: true,
      message: 'All user',
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
