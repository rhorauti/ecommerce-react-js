import HttpMethodType from "@core/enums/httpMethod";
import {
  IRequestLogin,
  IRequestSignup,
  IResponseCheckToken,
  IResponseEmailRecover,
  IResponseLogin,
  IResponseSignup,
} from "@core/interfaces/IAuthUser";
import { httpRequest } from "@core/http/httpRequest";

const apiURL = import.meta.env.VITE_API_URL;

export async function createUser(signupData: IRequestSignup): Promise<IResponseSignup> {
  return await httpRequest(`${apiURL}/user/signup`, HttpMethodType.POST, signupData);
}

export async function authenticateUser(loginData: IRequestLogin): Promise<IResponseLogin> {
  return await httpRequest(`${apiURL}/user/login`, HttpMethodType.POST, loginData);
}

export async function sendEmailRecover(email: string): Promise<IResponseEmailRecover> {
  return await httpRequest(`${apiURL}/user/password-recover`, HttpMethodType.POST, {
    email: email,
  });
}

export async function updateUserPassword(password: string, token: string): Promise<IResponseSignup> {
  return await httpRequest(`${apiURL}/user/new-password?token=${token}`, HttpMethodType.PUT, { password: password });
}

export async function checkValidToken(token: string): Promise<IResponseCheckToken> {
  return await httpRequest(`${apiURL}/user/check-token?token=${token}`, HttpMethodType.GET);
}
