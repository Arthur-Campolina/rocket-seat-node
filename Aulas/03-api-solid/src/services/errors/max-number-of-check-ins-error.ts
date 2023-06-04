export class MaxNumberOfChenckInsError extends Error {
  constructor() {
    super("User has already checked in today!");
  }
}
