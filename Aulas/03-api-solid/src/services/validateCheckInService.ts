import { ICheckInRepositoy } from "@/repositories/ICheckInRepository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ValidateCheckInRequest {
  checkInId: string;
}

interface ValidateCheckInResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInService {
  constructor(private checkInRepository: ICheckInRepositoy) {}

  async execute({
    checkInId,
  }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInRepository.getById(checkInId);
    if (!checkIn) throw new ResourceNotFoundError();
    checkIn.validated_at = new Date();
    const updatedCheckIn = await this.checkInRepository.update(checkIn);
    return { checkIn: updatedCheckIn };
  }
}
