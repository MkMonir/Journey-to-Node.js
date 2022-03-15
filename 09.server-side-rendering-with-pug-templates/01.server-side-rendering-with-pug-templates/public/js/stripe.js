/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51KdcWTJNoYmHoaT3dhqEUbd96kbNQOervmOPrVFcVf8IF4pT2LMFmA5fQaMuaBD6MDzCpDhzKYGg3ELpyQWCGBs8002dWE1rOw'
);

export const bookTour = async (tourId) => {
  try {
    // note: 1) GET CHEKOUT SESSION FROM API
    const session = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    });

    // note: 2) CREATE CHECKOUT FROM + CHARGE CREDIT CARD
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
