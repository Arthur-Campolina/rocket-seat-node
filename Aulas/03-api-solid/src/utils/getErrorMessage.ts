import { getReasonPhrase, StatusCodes } from "http-status-codes";

export const getErrorMessage = (status: StatusCodes, message?:string):string => message ? `[${StatusCodes.CONFLICT}] - ${getReasonPhrase(status)}: ${message}` : `[${StatusCodes.CONFLICT}] - ${getReasonPhrase(status)}`
