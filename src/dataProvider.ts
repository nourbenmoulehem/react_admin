import simpleRestProvider from "ra-data-simple-rest";
import { http, API_BASE_URL } from "../src/api/http";


const httpClient = async (
  url: string,
  options: any = {}
): Promise<{ status: number; headers: Headers; json: any }> => {
  const { data, status, headers: raw } = await http.request({
    url,
    method: options.method ?? "GET",
    data: options.body,
    params: options.params,
    headers: options.headers,
  });

  // Wrap plain object → Headers so .get() works
  const hdr = new Headers();
  Object.entries(raw).forEach(([k, v]) => hdr.append(k, String(v)));

  return { status, headers: hdr, json: data };
};

export const dataProvider = simpleRestProvider(
  API_BASE_URL,
  httpClient,
  "X-Total-Count"      
);
