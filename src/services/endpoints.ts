import { BooksBySubjectResponse } from "@/interfaces";
import API from "./API";
import { BooksPayload } from "./endpoints.type";
import qs from "qs";
import { BOOKS_GENRE } from "@/datas";

export const getBooksBySubject = (
  subject: keyof typeof BOOKS_GENRE,
  payload: BooksPayload
): Promise<BooksBySubjectResponse> => {
  console.log("query getBooksBySubject", qs.stringify(payload));
  return API.get(`/subjects/${subject}.json?${qs.stringify(payload)}`);
};
