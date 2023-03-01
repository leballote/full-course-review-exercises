import { Button, ButtonGroup } from "@mui/material";
import PageButton from "./PageButton";

type Props = {
  pageIndex: number[];
  isFirstPage?: boolean;
  isLastPage?: boolean;
  onGoPageClick?: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    pageNum: number
  ) => void;
  onPrevClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onNextClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function PageNavBar({
  pageIndex,
  isFirstPage = false,
  isLastPage = false,
  onGoPageClick,
  onPrevClick,
  onNextClick,
}: Props) {
  return (
    // <nav>
    <ButtonGroup>
      <Button onClick={onPrevClick} disabled={isFirstPage}>
        prev
      </Button>
      <ButtonGroup>
        {pageIndex.map((num) => {
          return (
            <PageButton key={num} pageNum={num} onGoPageClick={onGoPageClick} />
          );
        })}
      </ButtonGroup>
      <Button onClick={onNextClick} disabled={isLastPage}>
        next
      </Button>
    </ButtonGroup>
    // </nav>
  );
}
