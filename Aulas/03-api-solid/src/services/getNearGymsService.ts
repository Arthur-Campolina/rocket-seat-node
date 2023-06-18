import { Gym } from "@prisma/client";
import { IGymRepository } from "@/repositories/IGymRepository";

interface GetNearGymsRequest {
  userLatitude: number;
  userLongitude: number;
}
interface GetNearGymsResponse {
  gyms: Gym[];
}

export class GetNearGymsService {
  constructor(private gymRepository: IGymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: GetNearGymsRequest): Promise<GetNearGymsResponse> {
    const gyms = await this.gymRepository.findNearGyms({
      latitude: userLatitude,
      longitude: userLongitude,
    });
    return { gyms };
  }
}
