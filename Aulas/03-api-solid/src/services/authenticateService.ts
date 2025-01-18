import { IUserRepository } from "@/repositories/IUserRepository";
import { User } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) 
      throw new InvalidCredentialsError()
    
    const doesPasswordMatch = await compare(password, user.password);
    
    if (!doesPasswordMatch) 
      throw new InvalidCredentialsError()
    

    return {
      user,
    };
  }
}
