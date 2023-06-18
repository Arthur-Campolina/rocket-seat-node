import { ICheckInRepositoy } from "@/repositories/ICheckInRepository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { CheckInValidationTimeExpired } from "./errors/check-in-validation-time-expired";

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
    // checks if check-in has been created
    const checkInInDB = await this.checkInRepository.getById(checkInId);
    if (!checkInInDB) throw new ResourceNotFoundError();

    // tries to validate check-in
    const diffBetweenNowAndCheckInCreationTime = dayjs(new Date()).diff(
      checkInInDB.created_at,
      "minutes"
    );
    const twentyMinutes = 20;
    if (diffBetweenNowAndCheckInCreationTime > twentyMinutes) {
      throw new CheckInValidationTimeExpired();
    }
    checkInInDB.validated_at = new Date();
    const checkIn = await this.checkInRepository.update(checkInInDB);
    return { checkIn };
  }
}
