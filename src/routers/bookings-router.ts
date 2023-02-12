import { bookingsController } from '@/controllers/bookings-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const bookingsRouter = Router();

bookingsRouter
  .all('/*', authenticateToken)
  .post('/', bookingsController.postBooking)
  .get('/', bookingsController.getBookings)
  .put('/:bookingId', bookingsController.updateBookingById);
export { bookingsRouter };
