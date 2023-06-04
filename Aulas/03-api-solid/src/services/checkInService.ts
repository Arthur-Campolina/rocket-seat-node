import { PrismaCheckInRepository } from "@/repositories/prisma/PrismaCheckInRepository";
import { PrismaGymRepository } from "@/repositories/prisma/PrismaGymRepository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfChenckInsError } from "./errors/max-number-of-check-ins-error";

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(
    private checkInRepository: PrismaCheckInRepository,
    private gymRepository: PrismaGymRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    // === CHECKS IF USERS'S ALREADY CHECKED IN TODAY
    const hasUserCheckedInTodayAlready =
      await this.checkInRepository.findByUserOnADate(userId);
    if (hasUserCheckedInTodayAlready) throw new MaxNumberOfChenckInsError();

    const gym = await this.gymRepository.findById(gymId);
    if (!gym) throw new ResourceNotFoundError();

    // === CHECKS IF USER IS NEAR THE GYM
    const distance = getDistanceBetweenCoordinates(
      {
        longitude: gym.longitude.toNumber(),
        latitude: gym.latitude.toNumber(),
      },
      {
        longitude: userLongitude,
        latitude: userLatitude,
      }
    );
    const MAX_DISTANCE_KM = 0.1;
    if (distance >= MAX_DISTANCE_KM) throw new MaxDistanceError();

    // === USER CHECKS IN IF IT'S THEIR FIRST TIME TODAY AND THE GYM IS NEAR
    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
