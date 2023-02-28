type Props = {
  pageNum: number;
  onGoPageClick?: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    pageNum: number
  ) => void;
};

export default function PageButton({ pageNum, onGoPageClick }: Props) {
  return (
    <button
      onClick={(ev) => {
        onGoPageClick && onGoPageClick(ev, pageNum);
      }}
    >
      {pageNum}
    </button>
  );
}
