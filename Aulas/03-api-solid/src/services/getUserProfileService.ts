import { IUserRepository } from "@/repositories/IUserRepository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface AuthenticateServiceRequest {
  id: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class GetUserProfileService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    id,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.userRepository.findById(id);
    
    if (!user) 
      throw new ResourceNotFoundError();
    
    return { 
      user, 
    };
  }
}
