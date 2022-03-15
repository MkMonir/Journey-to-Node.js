const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Tour = require('./../models/tourModel');

exports.checkoutSession = catchAsync(async (req, res, next) => {
  // note: 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // note: 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summery,
        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  // note: 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});
