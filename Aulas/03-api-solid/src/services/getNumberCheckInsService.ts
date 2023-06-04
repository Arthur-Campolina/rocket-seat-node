import { PrismaCheckInRepository } from "@/repositories/prisma/PrismaCheckInRepository";

export class GetNumberCheckInsByUser {
  constructor(private checkInRepository: PrismaCheckInRepository) {}

  async execute(userId: string): Promise<number> {
    const numberCheckIns = await this.checkInRepository.getNumberCheckinsByUser(
      userId
    );
    return numberCheckIns;
  }
}
