import { ServerResponse } from "http";

export interface IResponseHandlerWrapper {
  status: boolean;
  data: any;
}
export const responseHandler = async (
  response: Response
): Promise<IResponseHandlerWrapper> => {
  const data = await response.json();
  if (!response.ok) {
    return Promise.reject({
      status: false,
      message: data.message,
    });
  }
  return Promise.resolve({
    status: true,
    data: data,
  } as IResponseHandlerWrapper);
};
