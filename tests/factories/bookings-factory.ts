import { prisma } from "@/config";

export const createBooking = async (userId: number, roomId: number) => {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId
    }
  });
};
