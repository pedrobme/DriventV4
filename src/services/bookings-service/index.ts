import { notFoundError, roomIsFullError, unauthorizedError } from '@/errors';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import { bookingRepository } from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { roomRepository } from '@/repositories/rooms-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { Booking } from '@prisma/client';

const validateEnrollmentAndTicket = async (userId: number) => {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListHotelsError();
  }
};

const createNeWBooking = async (userId: number, roomId: number) => {
  const isValidRoom = await roomRepository.findRoomById(roomId);

  if (!isValidRoom) throw notFoundError();

  const bookingsAtValidRoom = await bookingRepository.findManyBookingsByRoomId(roomId);

  if (bookingsAtValidRoom.length === isValidRoom.capacity) throw roomIsFullError();

  const newBooking = await bookingRepository.createBooking(userId, roomId);

  return newBooking;
};

const getAllBookingsByUserId = async (userId: number) => {
  const userBookings = await bookingRepository.findManyBookingsByUserId(userId);
  if (userBookings.length == 0) throw notFoundError();

  return userBookings;
};

const tryUpdateBookingById = async (userBookings: Booking[], bookingId: number, roomId: number) => {
  const isValidRoom = await roomRepository.findRoomById(roomId);
  if (!isValidRoom) throw notFoundError();

  const bookingsAtValidRoom = await bookingRepository.findManyBookingsByRoomId(roomId);
  if (bookingsAtValidRoom.length === isValidRoom.capacity) throw roomIsFullError();

  const userBookingsId = userBookings.map((booking) => booking.id);
  if (!userBookingsId.includes(bookingId)) throw unauthorizedError();

  return await bookingRepository.updateOneBooking(bookingId, roomId);
};

export const bookingsService = {
  validateEnrollmentAndTicket,
  createNeWBooking,
  getAllBookingsByUserId,
  tryUpdateBookingById,
};
