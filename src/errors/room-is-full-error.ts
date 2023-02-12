import { ApplicationError } from "@/protocols";

export function roomIsFullError(): ApplicationError {
  return {
    name: "RoomIsFull",
    message: "Room does not have any empty place",
  };
}
