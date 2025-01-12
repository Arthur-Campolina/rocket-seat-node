import { getErrorMessage } from "@/utils/getErrorMessage";
import { StatusCodes } from "http-status-codes";

const message = getErrorMessage(StatusCodes.CONFLICT, 'User already exists!')

export class UserAlreadyExistsError extends Error {
  constructor() {
    super(message);
  }
}
