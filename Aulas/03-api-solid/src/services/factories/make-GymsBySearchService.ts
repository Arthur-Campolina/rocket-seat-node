import { PrismaGymRepository } from "@/repositories/prisma/PrismaGymRepository";
import { GetGymBySearch } from "../getGymsBySearchService";

export function makeGetGymsBySearchService() {
  const gymRepository = new PrismaGymRepository();
  const service = new GetGymBySearch(gymRepository);
  return service;
}
