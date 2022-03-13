const express = require('express');
const multer = require('multer');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const upload = multer({ dest: 'public/img/users' });

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

// note: PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(authController.protect);

router.route('/updateMyPassword').patch(authController.updateMyPassword);

router.route('/me').get(userController.getMe, userController.getUserById);
router.route('/updateMe').patch(upload.single('photo'), userController.updateMe);
router.route('/deleteMe').delete(userController.deleteMe);

// note: RESTRICT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
