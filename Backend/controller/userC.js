const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../model/userM");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const Appointment = require("../model/appM");



exports.newAppointment = async (req, res, next) => {
  try {
    const {
      doctor,
      fees,
      timing,
      paymentInfo,
    } = req.body;

    const appointment = await Appointment.create({
      doctor,
      fees,
      timing,
      paymentInfo,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

// Register a User
// exports.registerUser = catchAsyncError(async (req, res, next) => {
//     const myCloud = req.body.avatar
//         ? await cloudinary.v2.uploader.upload(req.body.avatar, {
//             folder: "ecommerce",
//             width: 300,
//             crop: "scale",
//         })
//         : {
//             public_id: myCloud.public_id,
//             url: myCloud.secure_url,
//         };

//     const { name, email, password } = req.body;

//     const user = await User.create({
//         name,
//         email,
//         password,
//         avatar: {
//             public_id: myCloud.public_id,
//             url: myCloud.secure_url,
//         },
//     });

//     sendToken(user, 201, res);
// });

// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, avatar } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: avatar?.public_id || "",
        url: avatar?.url || "",
      },
    });
  
    sendToken(user, 201, res);
  });
  
// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPassToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token now is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `C_UR_BLOG Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// update User Profile
// exports.updateProfile = catchAsyncError(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//     };

//     if (req.body.avatar !== "") {
//         const user = await User.findById(req.user.id);

//         const imageId = user.avatar.public_id;

//         await cloudinary.v2.uploader.destroy(imageId);

//         const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//             folder: "blogsUserImages",
//             width: 150,
//             crop: "scale",
//         });

//         newUserData.avatar = {
//             public_id: myCloud.public_id,
//             url: myCloud.secure_url,
//         };
//     }

//     const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//     });

//     res.status(200).json({
//         success: true,
//     });
// });
// Update User Profile
// exports.updateProfile = catchAsyncError(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//     };

//     if (req.files && req.files.avatar) {
//         const user = await User.findById(req.user.id);

//         if (user.avatar.public_id) {
//             await cloudinary.v2.uploader.destroy(user.avatar.public_id);
//         }

//         const result = await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath, {
//             folder: "blogsUserImages",
//             width: 150,
//             crop: "scale",
//         });

//         newUserData.avatar = {
//             public_id: result.public_id,
//             url: result.secure_url,
//         };
//     }

//     const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//         new: true,
//         runValidators: true,
//     });

//     res.status(200).json({
//         success: true,
//         user,
//     });
// });
// exports.updateProfile = catchAsyncError(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//     };

//     console.log("Request Files: ", req.files);

//     if (req.files && req.files.avatar) {
//         const user = await User.findById(req.user.id);

//         if (user.avatar.public_id) {
//             await cloudinary.v2.uploader.destroy(user.avatar.public_id);
//         }

//         const result = await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath, {
//             folder: "blogsUserImages",
//             width: 150,
//             crop: "scale",
//         });

//         newUserData.avatar = {
//             public_id: result.public_id,
//             url: result.secure_url,
//         };
//     }

//     const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//         new: true,
//         runValidators: true,
//     });

//     res.status(200).json({
//         success: true,
//         user,
//     });
// });

// new one eco-f
// exports.updateProfile = catchAsyncError(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//     };

//     if (req.file) {
//         const user = await User.findById(req.user.id);
//         const imageId = user.avatar.public_id;

//         // Delete previous avatar from Cloudinary
//         if (imageId) {
//             await cloudinary.uploader.destroy(imageId);
//         }

//         // Upload new avatar to Cloudinary
//         const result = await cloudinary.uploader.upload(req.file.buffer, {
//             folder: "ecommerce",
//             width: 150,
//             crop: "scale",
//         });

//         newUserData.avatar = {
//             public_id: result.public_id,
//             url: result.secure_url,
//         };
//     }

//     const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//     });

//     res.status(200).json({
//         success: true,
//     });
// });

// exports.updateProfile = catchAsyncError(async (req, res, next) => {
//     console.log("Received update request:", req.body);
//     console.log("Received file:", req.file);

//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//     };

//     if (req.file) {
//         const user = await User.findById(req.user.id);

//         if (user.avatar && user.avatar.public_id) {
//             await cloudinary.uploader.destroy(user.avatar.public_id);
//         }

//         // Upload to Cloudinary
//         const result = await cloudinary.uploader.upload_stream(
//             { folder: "ecommerce", width: 150, crop: "scale" },
//             (error, result) => {
//                 if (error) {
//                     console.error("Cloudinary Upload Error:", error);
//                     return next(new ErrorHandler(error.message, 500));
//                 }
//                 newUserData.avatar = {
//                     public_id: result.public_id,
//                     url: result.secure_url,
//                 };
//             }
//         );

//         // Convert buffer to stream and send to Cloudinary
//         const stream = cloudinary.uploader.upload_stream((error, result) => {
//             if (error) {
//                 return next(new ErrorHandler(error.message, 500));
//             }
//             newUserData.avatar = {
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             };
//         });

//         stream.end(req.file.buffer);
//     }

//     await User.findByIdAndUpdate(req.user.id, newUserData, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//     });

//     res.status(200).json({
//         success: true,
//     });
// });

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const { name, email, avatar } = req.body;
  
    const newUserData = {
      name,
      email,
    };
  
    if (avatar) {
      // Validate avatar object
      if (!avatar.public_id || !avatar.url) {
        return res.status(400).json({
          success: false,
          message: "Avatar must include public_id and url",
        });
      }
  
      // Delete old avatar from Cloudinary
      const user = await User.findById(req.user.id);
      if (user.avatar && user.avatar.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }
  
      newUserData.avatar = avatar;
    }
  
    await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });



// Get all users(admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// update User Role -- Admin
// exports.updateUserRole = catchAsyncError(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//         role: req.body.role,
//     };

//     await User.findByIdAndUpdate(req.params.id, newUserData, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//     });

//     res.status(200).json({
//         success: true,
//     });
// });
// adminController.js
exports.updateUserRole = async (req, res) => {
    try {
        const newUserData = {
          role: req.body.role,
        };
    
        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
    
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
    
        res.status(200).json({
          success: true,
          message: "User updated successfully",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
};


// Delete User --Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});