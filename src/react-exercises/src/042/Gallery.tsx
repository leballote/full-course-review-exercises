import React, {
  Ref,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import GalleryBody, { GalleryBodySxType } from "./GalleryBody";
import PageButton from "./PageButton";
import PageNavbar from "./PageNavbar";
import isAtBottom from "./isAtBottom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { galleryApi, useGetPageQuery } from "./services/gallery";
import { setPageNo } from "../app/042/gallerySlice";
import { RootState, store } from "../app/store";

//todo unify the types
type Image = {
  src: string;
  width: number;
  height: number;
};

type Page = {
  images: Image[];
  page: number;
  total: number;
};

type NextPageData = {
  nextPage: Page;
};

type Props = {
  initialGalleryId?: string;
  ref?: React.RefObject<HTMLDivElement>;
  scrollerRef?: React.RefObject<HTMLElement>;
  galleryBodyRef?: React.RefObject<HTMLUListElement>;
  galleryBodySx?: GalleryBodySxType;
};

export default function Gallery(
  { ref, scrollerRef, galleryBodyRef, galleryBodySx }: Props = {} as any
) {
  // const hookRes = usePage({});
  const dispatch = useAppDispatch();
  const prefetchPage = galleryApi.usePrefetch("getPage");
  const { count, galleryId, pageNo } = useAppSelector((state) => state.gallery);

  const {
    data: page,
    isError,
    isLoading,
  } = useGetPageQuery({
    count,
    galleryId,
    pageNo,
  });

  const total = page?.total ?? 0;

  const pageIndices = [];
  for (let i = 1; i <= total; i++) {
    pageIndices.push(i);
  }

  const listener = useCallback(
    function (ev: any) {
      if (isAtBottom(ev.currentTarget)) {
        prefetchPage({
          count,
          galleryId,
          pageNo: pageNo + 1,
        });
      }
    },
    [pageNo]
  );

  useEffect(() => {
    if (scrollerRef && scrollerRef.current) {
      scrollerRef.current!.addEventListener("scroll", listener);
    }

    return () => {
      removeEventListener("scroll", listener);
    };
  }, [scrollerRef?.current, page]);

  useEffect(() => {
    if (scrollerRef?.current) {
      scrollerRef.current.scrollTop = 0;
    }
  }, [pageNo]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{"Errored :("}</h1>;
  }

  function handleOnNextClick() {
    dispatch(setPageNo({ pageNo: pageNo + 1 }));
  }

  return (
    <div ref={ref} data-testid="gallery">
      <PageNavbar
        pageIndex={pageIndices}
        currentIndex={pageNo}
        onGoPageClick={(_, pageNum) => {
          dispatch(setPageNo({ pageNo: pageNum }));
        }}
        onPrevClick={() => {
          dispatch(setPageNo({ pageNo: pageNo - 1 }));
        }}
        onNextClick={handleOnNextClick}
      />
      <GalleryBody
        pageNo={pageNo}
        images={page!.images}
        ref={galleryBodyRef}
        sx={galleryBodySx}
      />
    </div>
  );
}
