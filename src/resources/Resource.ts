import { AxiosInstance } from "axios";
import { Model } from "./interfaces";
import injectUriParams from "./injectUriParams";

export default class Resource<T extends Model> {
  constructor(public http: AxiosInstance, public uri: string) {}

  async query(
    paramsInput: Record<string, any> = {}
  ): Promise<T[] & { $headers: Record<string, string> }> {
    const { uri, params } = injectUriParams(this.uri, paramsInput);
    const res = await this.http.get(uri, { params });
    const data = res.data;
    data.$headers = res.headers;
    return data;
  }

  async create(
    body: Partial<T>,
    paramsInput: Record<string, any> = {}
  ): Promise<T> {
    const { uri, params } = injectUriParams(this.uri, paramsInput);
    return (
      await this.http.post(uri, body, {
        params
      })
    ).data;
  }

  async update(paramsInput: Record<string, any>, body: Partial<T>): Promise<T> {
    const { uri, params } = injectUriParams(this.uri, paramsInput);
    return (await this.http.put(uri, body, { params })).data;
  }

  async get(paramsInput: Record<string, any>): Promise<T> {
    const { uri, params } = injectUriParams(this.uri, paramsInput);
    return (await this.http.get(uri, { params })).data;
  }

  async delete(paramsInput: Record<string, any>): Promise<T> {
    const { uri, params } = injectUriParams(this.uri, paramsInput);
    return (await this.http.delete(uri, { params })).data;
  }

  save(body: Partial<T>, params: Record<string, any> = {}): Promise<T> {
    if (body.id) {
      return this.update({ id: body.id, ...params }, body);
    } else {
      return this.create(body, params);
    }
  }
}
