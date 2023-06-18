import { IGymRepository } from "@/repositories/IGymRepository";
import { Gym } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreateGymServiceRequest {
  title: string;
  description?: string | null;
  phone: string | null;
  longitude: number;
  latitude: number;
}
interface CreateGymServiceResponse {
  gym: Gym;
}

export class CreateGymService {
  constructor(private gymRepository: IGymRepository) {}

  async execute({
    title,
    description,
    phone,
    longitude,
    latitude,
  }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {
    const data = { title, description, phone, longitude, latitude };
    const gym = await this.gymRepository.create(data);
    if (!gym) {
      throw new ResourceNotFoundError();
    }
    return { gym };
  }
}
