import { BooksBySubjectResponse } from "@/interfaces";
import API from "./API";
import { BooksPayload } from "./endpoints.type";
import qs from "qs";

export const getBooksBySubject = (subject: string, payload: BooksPayload): Promise<BooksBySubjectResponse> => {
  console.log("query", qs.stringify(payload));
  return API.get(`/subjects/${subject}.json?$${qs.stringify(payload)}`);
};
