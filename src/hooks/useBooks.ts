import { BooksBySubjectResponse } from "@/interfaces";
import { getBooksBySubject } from "@/services/endpoints";
import { BooksPayload } from "@/services/endpoints.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BOOKS_GENRE } from "../datas/enum";
import { useEffect } from "react";

interface UseBooksResponse {
  data?: { pages: BooksBySubjectResponse[] };
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  flattenedData: BooksBySubjectResponse["works"];
  onEndReached: () => void;
}

export const useBooks = (subject: keyof typeof BOOKS_GENRE): UseBooksResponse => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    ...props
  } = useInfiniteQuery<BooksBySubjectResponse>({
    queryKey: ["books", subject],
    queryFn: ({ pageParam = { limit: 4, offset: 0 } }) => {
      return getBooksBySubject(subject, pageParam as BooksPayload);
    },
    initialPageParam: {
      limit: 4,
      offset: 0,
    },
    getNextPageParam: (lastPage, pages) => {
      if (pages.flatMap((page) => page.works).length >= lastPage.work_count) return false;

      const params = {
        limit: 4,
        offset: pages.flatMap((page) => page.works).length,
      };
      return params;
    },
  });

  useEffect(() => {
    refetch();
  }, [subject]);

  const onEndReached = () => {
    if (isLoading) return;
    if (isError) return;
    if (isFetching) return;
    if (isFetchingNextPage) return;
    if (!hasNextPage) return;

    fetchNextPage();
  };

  return {
    data,
    isLoading,
    isSuccess,
    onEndReached,
    isError,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    flattenedData: data?.pages.flatMap((page, index) => page.works.map((work) => ({ ...work, page: index + 1 }))) || [],
    ...props,
  };
};
