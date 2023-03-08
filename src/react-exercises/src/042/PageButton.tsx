import { Button } from "@mui/material";

type Props = {
  pageNum: number;
  onGoPageClick?: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    pageNum: number
  ) => void;
  "data-testid"?: string;
};

export default function PageButton({
  pageNum,
  onGoPageClick,
  "data-testid": dataTestId,
}: Props) {
  return (
    <Button
      data-testid={dataTestId}
      size="small"
      onClick={(ev) => {
        onGoPageClick && onGoPageClick(ev, pageNum);
      }}
    >
      {pageNum}
    </Button>
  );
}
