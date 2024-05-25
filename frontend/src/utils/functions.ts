import { BASE_API_URL } from "./constants";

export const apiUrl = (route: string) => {
  return `${BASE_API_URL}${route}`;
};
