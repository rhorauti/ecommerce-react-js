import HttpMethodType from "@core/enums/httpMethod";
import { httpRequest } from "@core/http/httpRequest";
import { IProduct } from "@core/interfaces/IProduct";
import { IAxiosResponse } from "@core/interfaces/IAxiosResponse";

const apiURL = import.meta.env.VITE_API_URL;

export async function getProductsList(): Promise<IAxiosResponse<IProduct[]>> {
  return await httpRequest(`${apiURL}/products`, HttpMethodType.GET);
}
