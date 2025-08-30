import axios from "axios";
import HttpMethodType from "@core/enums/httpMethod";
import { store } from "@store/store";
import { getToken } from "@store/auth.store";

export async function httpRequest(url: string, httpMethodType = HttpMethodType.GET, data: any = ""): Promise<any> {
  return await axios({
    url: url,
    method: httpMethodType,
    data: data,
    // headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    headers: { Authorization: "Bearer " + store.getState().user.token },
  }).then((response: any) => {
    // if (response.token) localStorage.setItem("token", response.token);
    if (response.token) store.dispatch(getToken(response.token));
    return response.data;
  });
}
