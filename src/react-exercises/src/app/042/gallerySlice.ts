import {
  createAction,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
type Src = string;

type Page = {
  id: string;
  page: number;
  images: Src[];
  total: number;
};
type GalleryState = {
  galleryId: string;
  count: number;
  pageNo: number;

  currentPage: Page | undefined;
  nextPage: Page | undefined;
};

// Define the initial state using that type
const initialState: GalleryState = {
  galleryId: "1",
  count: 15,
  pageNo: 1,
  currentPage: undefined,
  nextPage: undefined,
};

export const gallerySlice = createSlice({
  name: "gallery",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPageNo(state, { payload }: PayloadAction<{ pageNo: number }>) {
      state.pageNo = payload.pageNo;
    },

    setCurrentPage(state, { payload }: PayloadAction<{ page: Page }>) {
      state.currentPage = payload.page;
    },

    setNextPage(state, { payload }: PayloadAction<{ page: Page }>) {
      state.nextPage = payload.page;
    },

    setCurrentPageToNext(state) {
      state.currentPage = state.nextPage;
    },
  },
});

const selectGalleryApi = (state: RootState) => state.galleryApi;

export const { setPageNo, setCurrentPage, setNextPage, setCurrentPageToNext } =
  gallerySlice.actions;

export default gallerySlice.reducer;
