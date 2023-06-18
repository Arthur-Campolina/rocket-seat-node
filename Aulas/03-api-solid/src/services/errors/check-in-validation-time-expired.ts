export class CheckInValidationTimeExpired extends Error {
  constructor() {
    super("It's been more than 20 minutes since you checked in!");
  }
}
