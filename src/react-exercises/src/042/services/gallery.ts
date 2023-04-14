import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Src = string;

type Image = {
  src: Src;
  height: number;
  width: number;
};

type Page = {
  id: string;
  images: Image[];
  page: number;
  total: number;
};

export const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3010" }),
  endpoints(builder) {
    return {
      getPage: builder.query<
        Page,
        { galleryId: string; count: number; pageNo: number }
      >({
        query: ({ galleryId, count, pageNo }) =>
          `gallery/${galleryId}?count=${count}&page=${pageNo}`,
      }),
    };
  },
});

export const { useGetPageQuery } = galleryApi;
