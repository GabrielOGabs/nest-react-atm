import { baseApiUrl } from "./constants";

export const apiUrl = (route: string) => {
  return `${baseApiUrl}${route}`;
};
