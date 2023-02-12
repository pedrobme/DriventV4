import { prisma } from "@/config";

const findRoomById = async (roomId: number) => {
  return prisma.room.findFirst({
    where: {
      id: roomId
    }
  });
};

export const roomRepository = {
  findRoomById
};
