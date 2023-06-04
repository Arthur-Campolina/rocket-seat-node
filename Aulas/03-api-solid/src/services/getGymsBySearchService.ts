import { PrismaGymRepository } from "@/repositories/prisma/PrismaGymRepository";
import { Gym } from "@prisma/client";

interface GetGymBySearchServiceRequest {
  query: string;
  page: number;
}
interface GetGymBySearchServiceResponse {
  gyms: Gym[];
}

export class GetGymBySearch {
  constructor(private gymRepository: PrismaGymRepository) {}

  async execute({
    query,
    page,
  }: GetGymBySearchServiceRequest): Promise<GetGymBySearchServiceResponse> {
    const gyms = await this.gymRepository.findBySearch(query, page);
    return { gyms };
  }
}
