import HttpMethodType from "@src/core/enums/httpMethod";
import { httpRequest } from "../httpRequest";
import { IProductInfo } from "@src/core/interfaces/IProductInfo";

const apiURL = import.meta.env.VITE_API_URL;

export async function getProductsList(): Promise<IProductInfo[]> {
  return await httpRequest(`${apiURL}/products`, HttpMethodType.GET);
}
