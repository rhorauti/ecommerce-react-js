import HttpMethodType from "@src/core/enums/httpMethod";
import { httpRequest } from "../httpRequest";
import { IProduct } from "@src/core/interfaces/IProduct";

const apiURL = import.meta.env.VITE_API_URL;

export async function getProductsList(): Promise<IProduct[]> {
  return await httpRequest(`${apiURL}/products`, HttpMethodType.GET);
}
