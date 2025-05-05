import { isObject } from "@/utils/helpers";

const toResponseData = (response: unknown) => {
  if (isObject(response) && "data" in response) {
    return response.data;
  }

  return response;
};

export { toResponseData };
