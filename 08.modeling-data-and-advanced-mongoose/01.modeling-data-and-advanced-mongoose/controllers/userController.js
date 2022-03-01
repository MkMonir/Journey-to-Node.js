const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

//////////// Users Route handlers

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) note: Create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('This route is not for password update. Please use /updateMyPassword.', 400)
    );
  }

  // 3) note: Filterd out unwanted fields name that are not allowed to be updated
  const filterBody = filterObj(req.body, 'name', 'email');

  // 3) note: Update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

//// create User
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! please use /signUp insted',
  });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

//// Get Users
exports.getAllUsers = factory.getAll(User);

//// Get User
exports.getUser = factory.getOne(User);

//// Update User
exports.updateUser = factory.updateOne(User);

//// Delete user
exports.deleteUser = factory.deleteOne(User);
