import { AuthenticatedRequest, handleApplicationErrors } from '@/middlewares';
import { bookingsService } from '@/services/bookings-service';
import { Response } from 'express';

const postBooking = async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    await bookingsService.validateEnrollmentAndTicket(userId);
    const newBooking = await bookingsService.createNeWBooking(userId, roomId);

    res.status(200).send({ id: newBooking.id });
  } catch (error) {
    handleApplicationErrors(error, req, res);
  }
};

const getBookings = async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req;

  try {
    const userBookings = await bookingsService.getAllBookingsByUserId(userId);
    res.status(200).send(userBookings);
  } catch (error) {
    handleApplicationErrors(error, req, res);
  }
};

const updateBookingById = async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req;
  const { bookingId } = req.params;
  const { roomId } = req.body;

  // TODO tests:
  // userId with any room --> status 404 (NotFound)
  // invalid roomId --> status 404 (NotFound)
  // room full / without space --> status 403 (Forbidden)
  // roomId dont belong to userId --> status 401 (Unauthorized)
  // update created --> status 200 (OK) + body: { id: updatedBooking.id }

  try {
    const userBookings = await bookingsService.getAllBookingsByUserId(userId);
    const updatedBooking = await bookingsService.tryUpdateBookingById(userBookings, Number(bookingId), Number(roomId));
    res.status(200).send({ id: updatedBooking.id });
  } catch (error) {
    handleApplicationErrors(error, req, res);
  }
};

export const bookingsController = {
  postBooking,
  getBookings,
  updateBookingById,
};
