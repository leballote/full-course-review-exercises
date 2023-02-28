import React, {
  Ref,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import GalleryBody from "./GalleryBody";
import PageButton from "./PageButton";
import PageNavBar from "./PageNavBar";
import "./Gallery.module.css";
import styles from "./Gallery.module.css";
import isAtBottom from "./isAtBottom";

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
  initialPageParam?: string;
  initialCountParam?: string;
  ref?: React.RefObject<HTMLDivElement>;
  scrollerRef?: React.RefObject<HTMLElement>;
  galleryBodyRef?: React.RefObject<HTMLUListElement>;
};

//TODO: nextpage doesn't really need to be a state since it shouldn't trigger a re-render, maybe with the reference we are settled
export default function Gallery({
  initialGalleryId = "1",
  initialCountParam = "10",
  initialPageParam = "1",
  ref,
  scrollerRef,
  galleryBodyRef,
}: Props = {}) {
  const hookRes = usePage({
    initialGalleryId,
    initialCountParam,
    initialPageParam,
  });

  const {
    page,
    pageParam,
    countParam,
    setPageParam,
    setPage,
    pageIndex,
    setCountParam,
    nextPageData,
    setNextPageData,
    fetchNextPage,
  } = hookRes;
  // const [temp, setTemp] = use
  // fetchNextPage();

  //when mounted, the scroller reference will get an event listener that retrieves the next page, and on unmount deletes that listener

  const listener = useCallback(function (ev: any) {
    if (isAtBottom(ev.currentTarget)) {
      fetchNextPage();
    }
  }, []);

  useEffect(() => {
    scrollerRef?.current?.addEventListener("scroll", listener);
    return () => {
      removeEventListener("scroll", listener);
    };
    //I don't know if this is an anty pattern, but I didn't find another way
  }, [scrollerRef?.current, pageParam, countParam, page]);

  useEffect(() => {
    if (scrollerRef?.current) {
      scrollerRef.current.scrollTop = 0;
    }
  }, [pageParam]);

  if (page == null) {
    return <h1>Loading...</h1>;
  }

  function handleOnNextClick() {
    setPageParam((page) => String(Number(page) + 1));
  }

  return (
    <div className={styles.gallery} ref={ref}>
      <PageNavBar
        pageIndex={pageIndex}
        onGoPageClick={(_, pageNum) => {
          setPageParam(String(pageNum));
        }}
        onPrevClick={() => {
          setPageParam((page) => String(Number(page) - 1));
        }}
        onNextClick={handleOnNextClick}
        isFirstPage={page.page === 1}
        isLastPage={page.page === page.total}
      />
      <GalleryBody images={page.images} ref={galleryBodyRef} />
    </div>
  );
}

function usePage(
  {
    initialGalleryId,
    initialPageParam,
    initialCountParam,
  }: {
    initialGalleryId: string;
    initialPageParam: string;
    initialCountParam: string;
  } = {
    initialGalleryId: "1",
    initialCountParam: "",
    initialPageParam: "",
  }
) {
  const [galeryId, setGaleryId] = useState<string>(initialGalleryId);
  const [pageParam, setPageParam, pageParamRef] =
    useStateRef<string>(initialPageParam);
  const [countParam, setCountParam] = useState<string>(initialCountParam);
  const [nextPageData, setNextPageData, nextPageDataRef] =
    useStateRef<NextPageData | null>(null);
  const pageIndex = [];

  const [page, setPage] = useState<Page | null>(null);

  if (page?.total) {
    for (let i = 1; i <= page.total; i++) {
      pageIndex.push(i);
    }
  }

  const base = "http://localhost:3000";
  const url = new URL(`galery/${galeryId}`, base);

  async function getImages() {
    if (
      nextPageData?.nextPage &&
      nextPageData.nextPage.page === parseInt(pageParam)
    ) {
      console.log("already got this");
      setPage(nextPageData.nextPage);
    } else {
      url.searchParams.set("page", pageParam);
      url.searchParams.set("count", countParam);
      const newPageRaw = await fetch(url.toString());
      const newPage: Page = await newPageRaw.json();
      setPage(newPage);
    }
  }

  const fetchNextPage = useCallback(async () => {
    //If you've already fetched it, don't do it again
    if (
      parseInt(pageParamRef.current) + 1 ===
      nextPageDataRef.current?.nextPage.page
    ) {
      return;
    }
    if (!Number.isNaN(parseInt(pageParamRef.current))) {
      url.searchParams.set("page", String(parseInt(pageParamRef.current) + 1));
    }
    const newPageRaw = await fetch(url.toString());
    const newPage: Page = await newPageRaw.json();
    setNextPageData({
      nextPage: newPage,
    });
  }, []);

  useEffect(() => {
    getImages();
  }, [galeryId, pageParam, countParam]);

  return {
    galeryId,
    pageParam,
    countParam,
    page,
    pageIndex,
    nextPageData,
    setGaleryId,
    setPageParam,
    setCountParam,
    setPage,
    setNextPageData,
    fetchNextPage,
  };
}

const useStateRef = <T extends unknown>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(initialState);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  // Use "as const" below so the returned array is a proper tuple
  return [state, setState, ref] as const;
};
