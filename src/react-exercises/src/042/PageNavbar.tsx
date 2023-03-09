import { Button, ButtonGroup } from "@mui/material";
import PageButton from "./PageButton";

type Props = {
  pageIndex: number[];
  currentIndex: number;
  onGoPageClick?: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    pageNum: number
  ) => void;
  onPrevClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onNextClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function PageNavbar({
  pageIndex,
  currentIndex,
  onGoPageClick,
  onPrevClick,
  onNextClick,
}: Props) {
  const isFirstPage = pageIndex[0] === currentIndex;
  const isLastPage = pageIndex.at(-1) === currentIndex;
  return (
    // <nav>
    <ButtonGroup>
      <Button
        onClick={onPrevClick}
        disabled={isFirstPage}
        data-testid="prevButton"
      >
        prev
      </Button>
      <ButtonGroup>
        {pageIndex.map((num) => {
          return (
            <PageButton
              key={num}
              pageNum={num}
              onGoPageClick={onGoPageClick}
              data-testid={`pageButton${num}`}
            />
          );
        })}
      </ButtonGroup>
      <Button
        onClick={onNextClick}
        disabled={isLastPage}
        data-testid="nextButton"
      >
        next
      </Button>
    </ButtonGroup>
    // </nav>
  );
}
