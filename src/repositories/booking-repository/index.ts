import { prisma } from '@/config';

const createBooking = async (userId: number, roomId: number) => {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId,
    },
  });
};

const findManyBookingsByRoomId = async (roomId: number) => {
  return prisma.booking.findMany({
    where: {
      roomId: roomId,
    },
  });
};

const findManyBookingsByUserId = async (userId: number) => {
  return prisma.booking.findMany({
    where: {
      userId: userId,
    },
  });
};

const updateOneBooking = async (bookingId: number, roomId: number) => {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId: roomId,
    },
  });
};

export const bookingRepository = {
  createBooking,
  findManyBookingsByRoomId,
  findManyBookingsByUserId,
  updateOneBooking,
};
