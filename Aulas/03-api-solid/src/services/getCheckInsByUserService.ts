import { ICheckInRepositoy } from "@/repositories/ICheckInRepository";
import { CheckIn } from "@prisma/client";

interface GetCheckInsByUserServiceRequest {
  userId: string;
  page: number;
}
interface GetCheckInsByUserServiceResponse {
  checkIns: CheckIn[];
}

export class GetCheckInsByUser {
  constructor(private checkInRepository: ICheckInRepositoy) {}

  async execute({
    userId,
    page,
  }: GetCheckInsByUserServiceRequest): Promise<GetCheckInsByUserServiceResponse> {
    const checkIns = await this.checkInRepository.getAllByUser(userId, page);
    return { checkIns };
  }
}
