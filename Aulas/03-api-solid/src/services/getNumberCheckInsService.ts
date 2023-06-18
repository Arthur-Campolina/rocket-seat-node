import { ICheckInRepositoy } from "@/repositories/ICheckInRepository";

export class GetNumberCheckInsByUser {
  constructor(private checkInRepository: ICheckInRepositoy) {}

  async execute(userId: string): Promise<number> {
    const numberCheckIns = await this.checkInRepository.getNumberCheckinsByUser(
      userId
    );
    return numberCheckIns;
  }
}
