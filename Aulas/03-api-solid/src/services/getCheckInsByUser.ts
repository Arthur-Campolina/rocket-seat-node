import { PrismaCheckInRepository } from "@/repositories/prisma/PrismaCheckInRepository";
import { CheckIn } from "@prisma/client";

interface GetCheckInsByUserServiceRequest {
  userId: string;
  page: number;
}
interface GetCheckInsByUserServiceResponse {
  checkIns: CheckIn[];
}

export class GetCheckInsByUser {
  constructor(private checkInRepository: PrismaCheckInRepository) {}

  async execute({
    userId,
    page,
  }: GetCheckInsByUserServiceRequest): Promise<GetCheckInsByUserServiceResponse> {
    const checkIns = await this.checkInRepository.getAllByUser(userId, page);
    return { checkIns };
  }
}
